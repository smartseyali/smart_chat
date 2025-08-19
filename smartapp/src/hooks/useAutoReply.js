import { useEffect, useRef } from "react";
import { database } from "../services/SupabaseService";
import { sendWhatsappMessage } from "../services/WhatsappService";

/**
 * Background listener that auto-sends template replies when inbound message matches a rule.
 * Expects tables:
 *  - messages (with fields: id, conversation_id, org_id, phone_number_id, body, type, direction)
 *  - conversations (with contact_id and contact phone, but we only need org_id/phone_number_id)
 *  - auto_reply_rules (managed by useReplyBot)
 */
export default function useAutoReply() {
  const rulesRef = useRef([]);
  const phoneNumberIdRef = useRef(null);
  const unsubscribersRef = useRef([]);

  useEffect(() => {
    let rulesChannel = null;
    let messagesChannel = null;

    async function start() {
      // Load org and phone number id
      const wabas = await database.get("waba_accounts", { status: "active" });
      const active = wabas && wabas.length > 0 ? wabas[0] : null;
      if (!active) return;
      phoneNumberIdRef.current = active.phone_number_id || active.waba_id;

      // Load rules
      const rls = await database.get("auto_reply_rules", {
        org_id: active.org_id,
        enabled: true,
      });
      rulesRef.current = rls || [];

      // Subscribe to rules updates
      rulesChannel = database.subscribe("auto_reply_rules", null, async () => {
        const latest = await database.get("auto_reply_rules", {
          org_id: active.org_id,
          enabled: true,
        });
        rulesRef.current = latest || [];
      });

      // Subscribe to new inbound messages
      messagesChannel = database.subscribe(
        "messages",
        null,
        async (payload) => {
          if (!payload || payload.eventType !== "INSERT") return;
          const record = payload.new || {};
          // Only inbound user messages; avoid replying to our own messages
          if (record.direction !== "inbound" || record.type !== "text") return;

          const text = (record.body || "").trim();
          if (!text) return;

          const rules = rulesRef.current || [];
          const lowered = text.toLowerCase();
          const match =
            (rules || []).find((r) => {
              const term = String(r.match_text || "").toLowerCase();
              if (!term) return false;
              return lowered.includes(term);
            }) || null;
          if (!match) return;

          await sendTemplateReply(match, record);
        }
      );
    }

    start();

    return () => {
      if (rulesChannel) database.unsubscribe(rulesChannel);
      if (messagesChannel) database.unsubscribe(messagesChannel);
      unsubscribersRef.current.forEach((fn) => {
        try {
          fn && fn();
        } catch {}
      });
      unsubscribersRef.current = [];
    };
  }, []);
}

function extractKeyValuePairs(text) {
  const pairs = [];
  // Split lines and segments by commas/semicolons
  const segments = text
    .split(/\n|,|;/)
    .map((s) => s.trim())
    .filter(Boolean);
  for (const seg of segments) {
    const m = seg.match(/([^:=\-]+)\s*(?:[:=\-])\s*(.+)/);
    if (!m) continue;
    const key = m[1].trim().toLowerCase();
    const value = m[2].trim().toLowerCase();
    if (key && value) pairs.push([key, value]);
  }
  return pairs;
}

function findMatchingRule(rules, pairs) {
  for (const rule of rules) {
    const ruleKey = (rule.match_key || "").toLowerCase();
    const ruleVal = (rule.match_value || "").toLowerCase();
    const matchType = rule.match_type || "equals";

    const found = pairs.find(([k, v]) => {
      if (k !== ruleKey) return false;
      return matchType === "contains" ? v.includes(ruleVal) : v === ruleVal;
    });
    if (found) return rule;
  }
  return null;
}

async function sendTemplateReply(rule, messageRecord) {
  const phoneNumberId = messageRecord.phone_number_id;
  let to =
    messageRecord.payload?.from ||
    messageRecord.from ||
    messageRecord.sender ||
    null;
  if (!to) {
    try {
      if (messageRecord.contact_id) {
        const contacts = await database.get("contacts", {
          id: messageRecord.contact_id,
        });
        if (contacts && contacts[0]?.phone) to = String(contacts[0].phone);
      }
    } catch {}
  }
  if (!phoneNumberId || !to) return;

  // Resolve template by id reference
  let tplName = null;
  let tplLang = "en";
  let tplParams = {};
  try {
    const recs = await database.get("whatsapp_templates", {
      id: rule.template_id,
    });
    const tpl = recs && recs[0];
    if (tpl) {
      tplName = tpl.name;
      tplLang = tpl.language || tplLang;
      // No per-rule params in simplified model; send without parameters
    }
  } catch {}
  if (!tplName) return;

  const messageData = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: tplName,
      language: { code: tplLang },
      components: [],
    },
  };

  const resp = await sendWhatsappMessage(phoneNumberId, messageData);
  if (!resp) return;

  try {
    await database.post("messages", {
      conversation_id: messageRecord.conversation_id,
      org_id: messageRecord.org_id,
      contact_id: messageRecord.contact_id,
      phone_number_id: messageRecord.phone_number_id,
      body: `[auto-reply:${tplName}]`,
      status: "sent",
      type: "template",
      direction: "outbound",
      payload: messageData,
      wa_message_id: resp.messages?.[0]?.id || null,
    });
  } catch {}
}

function buildTemplateComponents(params) {
  const components = [];
  const header = Array.isArray(params.header) ? params.header : [];
  if (header.length > 0) {
    components.push({
      type: "header",
      parameters: header.map((v) => ({ type: "text", text: String(v ?? "") })),
    });
  }
  const body = Array.isArray(params.body) ? params.body : [];
  if (body.length > 0) {
    components.push({
      type: "body",
      parameters: body.map((v) => ({ type: "text", text: String(v ?? "") })),
    });
  }
  // buttons: array of arrays
  if (Array.isArray(params.buttons)) {
    params.buttons.forEach((arr, idx) => {
      const p = Array.isArray(arr) ? arr : [];
      if (p.length > 0) {
        components.push({
          type: "button",
          sub_type: "url",
          index: String(idx),
          parameters: p.map((v) => ({ type: "text", text: String(v ?? "") })),
        });
      }
    });
  }
  return components;
}
