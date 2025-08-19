import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

//Supabase client setup
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  const url = new URL(req.url);
  const verifyToken = "SmartApp";

  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === verifyToken) {
      return new Response(challenge, { status: 200 });
    }
    return new Response("Verification failed", { status: 403 });
  }

  if (req.method === "POST") {
    try {
      const payload = await req.json();

      const headers = Object.fromEntries(req.headers);

      // Extract phone_number_id from webhook payload
      const phoneNumberId = payload?.entry?.[0]?.changes?.[0]?.value?.metadata
        ?.phone_number_id;

      let orgId = null;

      if (phoneNumberId) {
        // Lookup org_id from whatsapp_phone_numbers
        const { data: phoneData, error: phoneErr } = await supabase
          .from("whatsapp_phone_numbers")
          .select("org_id")
          .eq("phone_number_id", phoneNumberId)
          .single();

        if (!phoneErr && phoneData) {
          orgId = phoneData.org_id;
        }
      }

      // Store webhook event
      const { data: eventData, error: insertErr } = await supabase
        .from("webhook_events")
        .insert({
          org_id: orgId,
          headers,
          payload,
          signature_valid: true,
        })
        .select()
        .single();

      if (insertErr) {
        console.error("Error storing webhook:", insertErr);
        return new Response("Error processing webhook", { status: 500 });
      }

      // --- PROCESS CONTACTS / CONVERSATIONS / MESSAGES ---
      const value = payload?.entry?.[0]?.changes?.[0]?.value;

      if (!value) {
        return new Response("No value object", { status: 200 });
      }

      // Handle message events
      if (value.messages?.length) {
        const contact = value.contacts?.[0];
        const message = value.messages?.[0];

        // 1. Upsert contact
        let contactId = null;
        if (contact?.wa_id) {
          const { data: contactData, error: contactErr } = await supabase
            .from("contacts")
            .upsert(
              {
                org_id: orgId,
                phone: contact.wa_id,
                name: contact.profile?.name || null,
                optin: "unknown",
              },
              { onConflict: "org_id,phone" },
            )
            .select("id")
            .maybeSingle();

          if (!contactErr && contactData) {
            contactId = contactData.id;
          }
        }
        console.log("Contact ID:", contactId);
        // 2. Upsert conversation
        let conversationId = null;
        if (contactId) {
          const { data: convData, error: convErr } = await supabase
            .from("conversations")
            .upsert(
              {
                org_id: orgId,
                contact_id: contactId,
                phone_number_id: phoneNumberId,
                is_open: true,
                last_message_at: new Date().toISOString(),
              },
              { onConflict: "contact_id" },
            )
            .select("id")
            .single();

          if (!convErr && convData) {
            conversationId = convData.id;
          }
          console.log("Conversation ID:", convData?.id);
          console.log("Conversation Error:", convErr);
        }

        // 3. Insert message
        if (conversationId && message?.id) {
          await supabase.from("messages").upsert(
            {
              org_id: orgId,
              conversation_id: conversationId,
              contact_id: contactId,
              phone_number_id: phoneNumberId,
              direction: message.from === contact?.wa_id
                ? "inbound"
                : "outbound",
              wa_message_id: message.id,
              type: message.type || "unknown",
              status: "received",
              body: message.text?.body || message.button?.text || null,
              payload: value,
            },
            { onConflict: "wa_message_id" },
          );
        }
      }

      // Handle status updates
      if (value.statuses?.length) {
        for (const status of value.statuses) {
          await supabase
            .from("messages")
            .update({
              status: status.status,
              payload: value,
            })
            .eq("wa_message_id", status.id);
        }
      }

      return new Response("Webhook processed", { status: 200 });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return new Response("Invalid payload", { status: 400 });
    }
  }

  return new Response("Method not allowed", { status: 405 });
});
