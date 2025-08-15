import { useState, useEffect } from "react";
import { database } from "../services/SupabaseService";
import Swal from "sweetalert2";
import {
  getMessageTemplates,
  createMessageTemplate,
} from "../services/WhatsappService";

const useTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [waba, setWaba] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [form, setForm] = useState({
    templateName: "",
    category: "MARKETING",
    language: "en",
    body: "",
    footer: "",
    buttons: "",
  });

  // Button dropdown state
  const [buttonList, setButtonList] = useState([]);
  //   const [selectedButtonType, setSelectedButtonType] = useState(null);

  // Handle form input changes

  useEffect(() => {
    async function fetchTemplatesOnMount() {
      await database.get("waba_accounts", { status: "active" }).then((data) => {
        if (data && data.length > 0) {
          setWaba(data[0]);
        } else {
          Swal.fire({
            title: "Error!",
            text: "No active WABA accounts found.",
            icon: "error",
          });
        }
      });

      await database.get("whatsapp_templates").then((data) => {
        setTemplates(data);
      });
    }
    fetchTemplatesOnMount();
  }, []);

  const fetchTemplates = async () => {
    try {
      const result = await getMessageTemplates(waba.waba_id);
      if (result) {
        const newTemplates = result.data.map((data) => ({
          org_id: waba.org_id,
          waba_account_id: waba.id,
          name: data.name,
          category: data.category,
          language: data.language,
          status: data.status,
          components: data.components,
          meta_template_id: data.id,
        }));
        setTemplates(newTemplates); // update UI state
        await database.upsert(
          "whatsapp_templates",
          newTemplates,
          "org_id,meta_template_id"
        );
      } else {
        Swal.fire({
          title: "Error!",
          text: "No templates found or an error occurred.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error?.message || error.message,
        icon: "error",
      });
      return;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (option) => {
    setSelectedMedia(option);
  };

  // Button dropdown handler
  const handleButtonTypeChange = (option) => {
    // setSelectedButtonType(option);
    // Add a new button config to the list
    setButtonList((prev) => [
      ...prev,
      {
        type: option.value,
        label: "",
        url: "",
        phone: "",
        code: "",
      },
    ]);
  };

  // Update button config fields
  const handleButtonFieldChange = (idx, field, value) => {
    setButtonList((prev) =>
      prev.map((btn, i) => (i === idx ? { ...btn, [field]: value } : btn))
    );
  };

  // Remove button
  const handleRemoveButton = (idx) => {
    setButtonList((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleSaveTemplate = async () => {
    try {
      const templateData = {
        name: form.templateName,
        category: form.category,
        language: form.language,
        components: [
          ...(selectedMedia
            ? [
                {
                  type: "HEADER",
                  format: selectedMedia.value,
                  example: {
                    header_handle: [
                      "https://clvwhrgqmrxhtfurchkz.supabase.co/storage/v1/object/public/smartchat/Organization/Logos/cc76a56f-41a9-452f-b320-4955c52d19d4.png",
                    ],
                  },
                },
              ]
            : []),
          {
            type: "BODY",
            text: form.body,
          },
          {
            type: "FOOTER",
            text: form.footer,
          },
          ...buttonList.map((btn) => ({
            type: "BUTTONS",
            buttons: [
              btn.type === "custom"
                ? {
                    type: "QUICK_REPLY",
                    text: btn.label,
                  }
                : btn.type === "visit_website"
                ? {
                    type: "URL",
                    text: btn.label,
                    url: btn.url,
                  }
                : btn.type === "call_phone"
                ? {
                    type: "PHONE_NUMBER",
                    text: btn.label,
                    phone_number: btn.phone,
                  }
                : null,
            ].filter(Boolean),
          })),
        ],
      };
      const response = await createMessageTemplate(waba.waba_id, templateData);
      if (response) {
        await fetchTemplates();
        Swal.fire({
          title: "Success!",
          text: "Template created successfully.",
          icon: "success",
        });
        setShowModal(false);
        setForm({
          templateName: "",
          category: "",
          language: "",
          body: "",
          footer: "",
          buttons: "",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error?.message || error.message,
        icon: "error",
      });
      return;
    }
  };

  return {
    templates,
    fetchTemplates,
    showModal,
    setShowModal,
    handleCloseModal,
    handleOpenModal,
    handleRemoveButton,
    handleButtonFieldChange,
    handleButtonTypeChange,
    handleSelectChange,
    handleChange,
    handleSaveTemplate,
    waba,
    form,
    setForm,
    selectedMedia,
    buttonList,
  };
};
export default useTemplates;
