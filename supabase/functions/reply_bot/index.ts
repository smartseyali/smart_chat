import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

// Supabase client with service role key
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  try {
    const { org_id, contact_id, body } = await req.json();

    // 1. Find matching auto reply rule
    const { data: rules, error: rulesError } = await supabase
      .from("auto_reply_rules")
      .select("id, template_id")
      .eq("org_id", org_id)
      .eq("enabled", true);

    if (rulesError) throw rulesError;

    const rule = rules.find((r: any) =>
      body.toLowerCase().includes(r.match_text.toLowerCase())
    );
    if (!rule) {
      return new Response("No matching rule", { status: 200 });
    }

    // 2. Fetch template + WABA account + phone number
    const { data: template, error: tplErr } = await supabase
      .from("whatsapp_templates")
      .select("id, name, language, waba_account_id")
      .eq("id", rule.template_id)
      .single();
    if (tplErr) throw tplErr;

    const { data: waba, error: wabaErr } = await supabase
      .from("waba_accounts")
      .select("id, access_token")
      .eq("id", template.waba_account_id)
      .single();
    if (wabaErr) throw wabaErr;

    const { data: contact, error: contactErr } = await supabase
      .from("contacts")
      .select("phone")
      .eq("id", contact_id)
      .single();
    if (contactErr) throw contactErr;

    const { data: waNumber, error: numErr } = await supabase
      .from("whatsapp_phone_numbers")
      .select("phone_number_id")
      .eq("org_id", org_id)
      .limit(1)
      .single();
    if (numErr) throw numErr;

    // 3. Call WhatsApp Cloud API
    const waRes = await fetch(
      `https://graph.facebook.com/v22.0/${waNumber.phone_number_id}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${waba.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: contact.phone,
          type: "template",
          template: {
            name: template.name,
            language: { code: template.language },
          },
        }),
      },
    );

    const waResp = await waRes.json();

    // 4. Log outbound message in `messages`
    await supabase.from("messages").insert({
      org_id,
      conversation_id: null, // TODO: lookup conversation
      contact_id,
      phone_number_id: waNumber.phone_number_id,
      direction: "outbound",
      type: "template",
      status: waRes.ok ? "sent" : "failed",
      template_id: template.id,
      body: null,
      payload: waResp,
      error: waRes.ok ? null : JSON.stringify(waResp),
    });

    return new Response(JSON.stringify(waResp), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});
