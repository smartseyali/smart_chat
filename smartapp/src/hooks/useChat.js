import { useEffect, useState } from "react";
import { database } from "../services/SupabaseService";
import { sendWhatsappMessage } from "../services/WhatsappService";

const useChat = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConv, setSelectedConv] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showContactInfo, setShowContactInfo] = useState(false);

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
    if (!newMessage.trim() || !selectedConv) return;

    setNewMessage("");

    const messageData = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: selectedConv.phone,
      type: "text",
      text: { body: newMessage },
    };

    const resp = await sendWhatsappMessage("685001508038397", messageData);
    if (resp === null) return;
    await database.post("messages", {
      conversation_id: selectedConv.id,
      org_id: selectedConv.org_id,
      contact_id: selectedConv.contact_id,
      phone_number_id: selectedConv.phone_number_id,
      body: newMessage,
      status: resp ? "sent" : "failed",
      type: "text",
      direction: "outbound",
      payload: messageData,
      wa_message_id: resp ? resp.messages[0].id : null,
    });
  };

  return {
    activeTab,
    conversation,
    messages,
    selectedConv,
    newMessage,
    setNewMessage,
    showContactInfo,
    toggleContactInfo: () => setShowContactInfo(!showContactInfo),
    handleSendMessage,
    handleSelectedConv: setSelectedConv,
    handleTabSwitch: setActiveTab,
  };
};

export default useChat;
