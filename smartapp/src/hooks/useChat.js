import { useEffect, useState } from "react";
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
    handleSelectedConv: setSelectedConv,
    handleTabSwitch: setActiveTab,
    handleSendTemplate,
  };
};

export default useChat;
