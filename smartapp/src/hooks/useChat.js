import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { database } from "../services/SupabaseService";
import {
  sendWhatsappMessage,
  uploadWhatsappMedia,
} from "../services/WhatsappService";

const useChat = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConv, setSelectedConv] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);

  // Fetch and subscribe to conversations
  useEffect(() => {
    const fetchConversations = async () => {
      const data = await database.getConversations();
      setConversation(
        data.sort(
          (a, b) =>
            new Date(b.last_message_time) - new Date(a.last_message_time)
        )
      );
    };

    fetchConversations();

    const convChannel = database.subscribe("conversations", null, () => {
      fetchConversations();
    });

    return () => {
      database.unsubscribe(convChannel);
    };
  }, []);

  // Fetch and subscribe to messages of the selected conversation
  useEffect(() => {
    if (!selectedConv) return;

    const fetchMessages = async () => {
      const data = await database.get("messages", {
        conversation_id: selectedConv.id,
      });
      setMessages(data);
    };

    fetchMessages();

    const msgChannel = database.subscribe(
      "messages",
      { filter: `conversation_id=eq.${selectedConv.id}` },
      (payload) => {
        if (payload.eventType === "INSERT") {
          setMessages((prev) => [...prev, payload.new]);
        } else if (payload.eventType === "UPDATE") {
          setMessages((prev) =>
            prev.map((m) => (m.id === payload.new.id ? payload.new : m))
          );
        } else if (payload.eventType === "DELETE") {
          setMessages((prev) => prev.filter((m) => m.id !== payload.old.id));
        }
      }
    );

    return () => {
      database.unsubscribe(msgChannel);
    };
  }, [selectedConv]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!newMessage.trim() && pendingFiles.length === 0) || !selectedConv)
      return;

    const textToSend = newMessage;
    const filesToSend = pendingFiles;
    setNewMessage("");
    setPendingFiles([]);

    // Send text first (if any)
    if (textToSend.trim()) {
      const messageData = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: selectedConv.phone,
        type: "text",
        text: { body: textToSend },
      };
      const resp = await sendWhatsappMessage("685001508038397", messageData);
      if (resp) {
        await database.post("messages", {
          conversation_id: selectedConv.id,
          org_id: selectedConv.org_id,
          contact_id: selectedConv.contact_id,
          phone_number_id: selectedConv.phone_number_id,
          body: textToSend,
          status: "sent",
          type: "text",
          direction: "outbound",
          payload: messageData,
          wa_message_id: resp.messages?.[0]?.id || null,
        });
      }
    }

    // Send files (if any). Support images, video, audio, documents
    for (const file of filesToSend) {
      const mime = file.type;
      let waType = "document";
      if (mime.startsWith("image/")) waType = "image";
      else if (mime.startsWith("video/")) waType = "video";
      else if (mime.startsWith("audio/")) waType = "audio";

      const upload = await uploadWhatsappMedia("685001508038397", file, mime);
      if (!upload?.id) continue;

      const messageData = {
        messaging_product: "whatsapp",
        to: selectedConv.phone,
        type: waType,
        [waType]: {
          id: upload.id,
          caption:
            waType === "image" || waType === "video"
              ? textToSend || undefined
              : undefined,
          filename: waType === "document" ? file.name : undefined,
        },
      };

      const resp = await sendWhatsappMessage("685001508038397", messageData);
      if (resp) {
        await database.post("messages", {
          conversation_id: selectedConv.id,
          org_id: selectedConv.org_id,
          contact_id: selectedConv.contact_id,
          phone_number_id: selectedConv.phone_number_id,
          body: file.name,
          status: "sent",
          type: waType,
          direction: "outbound",
          payload: messageData,
          wa_message_id: resp.messages?.[0]?.id || null,
        });
      }
    }
  };

  // Create a conversation for a new phone number (no message sent)
  const createConversationForNumber = async (targetPhone, contactName = "") => {
    try {
      const phoneRaw = String(targetPhone || "").trim();
      const phone = phoneRaw.replace(/\D/g, "");
      if (!phone) {
        Swal.fire({
          title: "Missing data",
          text: "Phone is required.",
          icon: "warning",
        });
        return null;
      }

      // Resolve org and phone_number_id; prefer existing conversation metadata as fallback
      let orgId = conversation?.[0]?.org_id || null;
      let phoneNumberId = conversation?.[0]?.phone_number_id || null;
      if (!orgId) {
        const wabas = await database.get("waba_accounts", { status: "active" });
        if (wabas && wabas.length > 0) orgId = wabas[0].org_id;
      }
      if (!phoneNumberId) {
        phoneNumberId = "685001508038397"; // use configured phone number id
      }
      if (!orgId || !phoneNumberId) {
        Swal.fire({
          title: "Error!",
          text: "Missing organization or phone number configuration.",
          icon: "error",
        });
        return null;
      }

      // Find or create contact (ensure name is not null)
      let contacts = await database.get("contacts", { phone, org_id: orgId });
      let contact = contacts && contacts[0];
      if (!contact) {
        const created = await database.post("contacts", {
          org_id: orgId,
          phone,
          name: contactName || phone,
        });
        contact = created && created[0];
      } else if (!contact.name) {
        // Backfill missing name to avoid UI issues
        const updated = await database.put("contacts", contact.id, {
          name: contactName || phone,
        });
        contact = updated && updated[0] ? updated[0] : contact;
      }
      if (!contact) {
        Swal.fire({
          title: "Error!",
          text: "Failed to create or retrieve contact.",
          icon: "error",
        });
        return null;
      }

      // Create conversation
      const createdConvArr = await database.post("conversations", {
        org_id: orgId,
        contact_id: contact.id,
        phone_number_id: phoneNumberId,
      });
      const createdConv = createdConvArr && createdConvArr[0];
      if (!createdConv) {
        Swal.fire({
          title: "Error!",
          text: "Failed to create conversation.",
          icon: "error",
        });
        return null;
      }

      // Compose conversation object for UI return (do not auto-select)
      const convForUi = {
        id: createdConv.id,
        contact_id: contact.id,
        phone: contact.phone,
        phone_number_id: phoneNumberId,
        org_id: orgId,
        contact_name: contact.name || phone,
        last_message: "",
        last_message_time: null,
      };

      return convForUi;
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message || String(err),
        icon: "error",
      });
      return null;
    }
  };

  // Start a new chat by creating contact + conversation, then send an initial text message
  const startNewChatAndSend = async (
    targetPhone,
    textMessage,
    contactName = ""
  ) => {
    try {
      const phone = String(targetPhone || "").trim();
      const body = String(textMessage || "").trim();
      if (!phone || !body) {
        Swal.fire({
          title: "Missing data",
          text: "Phone and message are required.",
          icon: "warning",
        });
        return null;
      }

      // Resolve org and phone_number_id (using active WABA/account)
      const wabas = await database.get("waba_accounts", { status: "active" });
      if (!wabas || wabas.length === 0) {
        Swal.fire({
          title: "Error!",
          text: "No active WABA account found.",
          icon: "error",
        });
        return null;
      }
      const orgId = wabas[0].org_id;
      const phoneNumberId = "685001508038397"; // Using current configured phone number id

      // Find or create contact
      let contacts = await database.get("contacts", { phone, org_id: orgId });
      let contact = contacts && contacts[0];
      if (!contact) {
        const created = await database.post("contacts", {
          org_id: orgId,
          phone,
          name: contactName || null,
        });
        contact = created && created[0];
      }
      if (!contact) {
        Swal.fire({
          title: "Error!",
          text: "Failed to create or retrieve contact.",
          icon: "error",
        });
        return null;
      }

      // Create conversation
      const createdConvArr = await database.post("conversations", {
        org_id: orgId,
        contact_id: contact.id,
        phone_number_id: phoneNumberId,
      });
      const createdConv = createdConvArr && createdConvArr[0];
      if (!createdConv) {
        Swal.fire({
          title: "Error!",
          text: "Failed to create conversation.",
          icon: "error",
        });
        return null;
      }

      // Select new conversation in UI
      const convForUi = {
        id: createdConv.id,
        contact_id: contact.id,
        phone: contact.phone,
        phone_number_id: phoneNumberId,
        org_id: orgId,
        contact_name: contact.name || phone,
        last_message: "",
        last_message_time: null,
      };
      setSelectedConv(convForUi);

      // Send first message
      const messageData = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: phone,
        type: "text",
        text: { body },
      };
      const resp = await sendWhatsappMessage(phoneNumberId, messageData);
      if (resp) {
        await database.post("messages", {
          conversation_id: createdConv.id,
          org_id: orgId,
          contact_id: contact.id,
          phone_number_id: phoneNumberId,
          body,
          status: "sent",
          type: "text",
          direction: "outbound",
          payload: messageData,
          wa_message_id: resp.messages?.[0]?.id || null,
        });
      }

      return convForUi;
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message || String(err),
        icon: "error",
      });
      return null;
    }
  };

  const handleSendTemplate = async (
    template,
    params = {
      body: [],
      header: [],
      headerMedia: null,
      headerMediaKind: null,
      buttons: [],
    }
  ) => {
    if (!selectedConv || !template?.name) return;
    try {
      const components = [];

      // Header params: TEXT or media (IMAGE/VIDEO/DOCUMENT)
      const headerTemplate = (template.components || []).find(
        (c) => c.type === "HEADER"
      );
      if (headerTemplate?.format === "TEXT") {
        if (Array.isArray(params.header) && params.header.length > 0) {
          components.push({
            type: "header",
            parameters: params.header
              .filter(Boolean)
              .map((text) => ({ type: "text", text })),
          });
        }
      } else if (headerTemplate && params.headerMedia) {
        // Upload media and reference it
        const mediaFile = params.headerMedia;
        const upload = await uploadWhatsappMedia(
          "685001508038397",
          mediaFile,
          mediaFile.type
        );
        if (upload?.id) {
          const kind = (
            headerTemplate.format ||
            params.headerMediaKind ||
            ""
          ).toLowerCase();
          if (["image", "video", "document"].includes(kind)) {
            components.push({
              type: "header",
              parameters: [
                {
                  type: kind,
                  [kind]: { id: upload.id },
                },
              ],
            });
          }
        }
      }
      if (Array.isArray(params.body) && params.body.length > 0) {
        components.push({
          type: "body",
          parameters: params.body
            .filter(Boolean)
            .map((text) => ({ type: "text", text })),
        });
      }

      const messageData = {
        messaging_product: "whatsapp",
        to: selectedConv.phone,
        type: "template",
        template: {
          name: template.name,
          language: { code: template.language || "en" },
          ...(components.length > 0 ? { components: [...components] } : {}),
        },
      };

      // Button URL parameters: each button index with params
      const buttonTemplates = (template.components || []).filter(
        (c) => c.type === "BUTTONS"
      );
      const flatButtons = buttonTemplates.flatMap((c) => c.buttons || []);
      if (Array.isArray(params.buttons) && params.buttons.length > 0) {
        params.buttons.forEach((paramList, idx) => {
          if (!paramList || paramList.length === 0) return;
          const comp = {
            type: "button",
            sub_type: "url",
            index: String(idx),
            parameters: paramList
              .filter(Boolean)
              .map((text) => ({ type: "text", text })),
          };
          if (!messageData.template.components)
            messageData.template.components = [];
          messageData.template.components.push(comp);
        });
      }

      // Build a human readable preview for chat rendering
      const bodyComponent = (template.components || []).find(
        (c) => c.type === "BODY"
      );
      let renderedBody = bodyComponent?.text || `Template: ${template.name}`;
      if (
        renderedBody &&
        Array.isArray(params.body) &&
        params.body.length > 0
      ) {
        let i = 0;
        renderedBody = renderedBody.replace(
          /\{\{\d+\}\}/g,
          () => params.body[i++] ?? ""
        );
      }
      const footerComponent = (template.components || []).find(
        (c) => c.type === "FOOTER"
      );
      const buttonsComponents = (template.components || []).filter(
        (c) => c.type === "BUTTONS"
      );
      const allButtons = buttonsComponents.flatMap((c) => c.buttons || []);

      // Resolve button URLs with provided params for preview
      const resolvedButtons = allButtons.map((b, i) => {
        let url = b.url;
        const p = Array.isArray(params.buttons) ? params.buttons[i] || [] : [];
        if (typeof url === "string" && p.length > 0) {
          let k = 0;
          url = url.replace(/\{\{\d+\}\}/g, () => p[k++] ?? "");
        }
        return {
          type: b.type,
          text: b.text,
          url,
          phone_number: b.phone_number,
        };
      });

      const resp = await sendWhatsappMessage("685001508038397", messageData);
      if (resp) {
        await database.post("messages", {
          conversation_id: selectedConv.id,
          org_id: selectedConv.org_id,
          contact_id: selectedConv.contact_id,
          phone_number_id: selectedConv.phone_number_id,
          body: renderedBody,
          status: "sent",
          type: "template",
          direction: "outbound",
          payload: {
            ...messageData,
            template_preview: {
              name: template.name,
              bodyText: renderedBody,
              footerText: footerComponent?.text || "",
              buttons: resolvedButtons,
              params,
            },
          },
          wa_message_id: resp.messages?.[0]?.id || null,
        });
      }
    } catch (err) {
      // No-op, ApiService already toasts
    }
  };

  return {
    activeTab,
    conversation,
    messages,
    selectedConv,
    newMessage,
    setNewMessage,
    pendingFiles,
    setPendingFiles,
    showContactInfo,
    toggleContactInfo: () => setShowContactInfo(!showContactInfo),
    handleSendMessage,
    createConversationForNumber,
    startNewChatAndSend,
    handleSelectedConv: setSelectedConv,
    handleTabSwitch: setActiveTab,
    handleSendTemplate,
  };
};

export default useChat;
