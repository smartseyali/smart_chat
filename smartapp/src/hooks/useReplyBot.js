import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { database } from "../services/SupabaseService";
import { getMessageTemplates } from "../services/WhatsappService";

/**
 * Manage auto-reply rules that match key:value pairs in inbound messages
 * Table expected: auto_reply_rules
 * Columns (suggested):
 *  - id (uuid)
 *  - org_id (uuid)
 *  - name (text)
 *  - enabled (bool)
 *  - match_type (text: 'equals' | 'contains')
 *  - match_key (text)
 *  - match_value (text)
 *  - template_name (text)
 *  - language (text, e.g. 'en')
 *  - params (jsonb: { header: string[], body: string[], buttons: string[][] })
 */
export default function useReplyBot() {
  const [rules, setRules] = useState([]);
  const [org, setOrg] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let rulesChannel = null;
    async function init() {
      try {
        setLoading(true);
        const wabas = await database.get("waba_accounts", { status: "active" });
        const active = wabas && wabas.length > 0 ? wabas[0] : null;
        setOrg(active);

        if (active) {
          const [tpls, rls] = await Promise.all([
            database.get("whatsapp_templates", { org_id: active.org_id }),
            database.get("auto_reply_rules", { org_id: active.org_id }),
          ]);
          setTemplates(tpls || []);
          setRules(rls || []);

          // Live updates for rules
          rulesChannel = database.subscribe(
            "auto_reply_rules",
            null,
            async (payload) => {
              if (!payload) return;
              const latest = await database.get("auto_reply_rules", {
                org_id: active.org_id,
              });
              setRules(latest || []);
            }
          );
        }
      } catch (err) {
        Swal.fire({ title: "Error!", text: err.message, icon: "error" });
      } finally {
        setLoading(false);
      }
    }
    init();
    return () => {
      if (rulesChannel) database.unsubscribe(rulesChannel);
    };
  }, []);

  const templateOptions = useMemo(
    () =>
      (templates || [])
        .filter((t) => String(t.status || "").toUpperCase() === "APPROVED")
        .map((t) => ({
          label: `${t.name} • ${t.language}`,
          value: t.id, // reference by template row id
          name: t.name,
          language: t.language,
        })),
    [templates]
  );

  async function createRule(ruleInput) {
    if (!org) return;
    const record = {
      org_id: org.org_id,
      name: ruleInput.name || `${ruleInput.match_text}`,
      enabled: ruleInput.enabled ?? true,
      match_text: (ruleInput.match_text || "").trim(),
      template_id: ruleInput.template_id,
    };
    try {
      await database.post("auto_reply_rules", record);
      Swal.fire({ title: "Saved", text: "Rule created", icon: "success" });
    } catch (err) {
      Swal.fire({ title: "Error!", text: err.message, icon: "error" });
    }
  }

  async function updateRule(id, patch) {
    try {
      await database.put("auto_reply_rules", id, patch);
      Swal.fire({ title: "Updated", text: "Rule updated", icon: "success" });
    } catch (err) {
      Swal.fire({ title: "Error!", text: err.message, icon: "error" });
    }
  }

  async function deleteRule(id) {
    try {
      await database.delete("auto_reply_rules", id);
      Swal.fire({ title: "Deleted", text: "Rule removed", icon: "success" });
    } catch (err) {
      Swal.fire({ title: "Error!", text: err.message, icon: "error" });
    }
  }

  return {
    loading,
    rules,
    templates,
    templateOptions,
    syncTemplates: async () => {
      try {
        setLoading(true);
        const wabas = await database.get("waba_accounts", { status: "active" });
        const active = wabas && wabas.length > 0 ? wabas[0] : null;
        if (!active) throw new Error("No active WABA account found");
        const result = await getMessageTemplates(active.waba_id);
        if (!result || !Array.isArray(result.data))
          throw new Error("No templates returned");
        const newTemplates = result.data.map((data) => ({
          org_id: active.org_id,
          waba_account_id: active.id,
          name: data.name,
          category: data.category,
          language: data.language,
          status: data.status,
          components: data.components,
          meta_template_id: data.id,
        }));
        await database.upsert(
          "whatsapp_templates",
          newTemplates,
          "org_id,meta_template_id"
        );
        const refreshed = await database.get("whatsapp_templates", {
          org_id: active.org_id,
        });
        setTemplates(refreshed || []);
        Swal.fire({ title: "Done", text: "Templates synced", icon: "success" });
      } catch (err) {
        Swal.fire({ title: "Error!", text: err.message, icon: "error" });
      } finally {
        setLoading(false);
      }
    },
    createRule,
    updateRule,
    deleteRule,
  };
}
