import Swal from "sweetalert2";
import ApiService from "/src/services/ApiService.js";

/**
 * Send a WhatsApp message using Cloud API
 * @param {string} phoneNumberId - The WhatsApp Business Account phone number ID
 * @param {object} messageData - The message payload (see WhatsApp Cloud API docs)
 */
export async function sendWhatsappMessage(phoneNumberId, messageData) {
  try {
    const response = await ApiService.post(
      `${phoneNumberId}/messages`,
      messageData
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.error?.message || error.message,
      icon: "error",
    });
    return null;
  }
}

/**
 * Upload media to WhatsApp Cloud API
 * Returns an object with id of uploaded media
 * @param {string} phoneNumberId
 * @param {File|Blob} file
 * @param {string} [typeHint] optional MIME override
 */
export async function uploadWhatsappMedia(phoneNumberId, file, typeHint) {
  try {
    const formData = new FormData();
    formData.append("messaging_product", "whatsapp");
    formData.append("file", file);
    if (typeHint) formData.append("type", typeHint);
    const response = await ApiService.postForm(
      `${phoneNumberId}/media`,
      formData
    );
    return response.data; // { id }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.error?.message || error.message,
      icon: "error",
    });
    return null;
  }
}

/**
 * Get media metadata (e.g., URL) by media id
 * @param {string} mediaId
 */
export async function getWhatsappMedia(mediaId) {
  try {
    const response = await ApiService.get(`${mediaId}`);
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.error?.message || error.message,
      icon: "error",
    });
    return null;
  }
}

/**
 * Create a Message template using Cloud API
 * @param {string} wabaId - The WhatsApp Business Account ID
 * @param {object} templateData - The message payload (see WhatsApp Cloud API docs)
 */
export async function createMessageTemplate(wabaId, templateData) {
  try {
    const response = await ApiService.post(
      `${wabaId}/message_templates`,
      templateData
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.error?.message || error.message,
      icon: "error",
    });
    return null;
  }
}

/**
 * Get WhatsApp Business Profile
 * @param {string} phoneNumberId
 */
export async function getWhatsappProfile(phoneNumberId) {
  try {
    const response = await ApiService.get(
      `${phoneNumberId}/whatsapp_business_profile`
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.error?.message || error.message,
      icon: "error",
    });
    return null;
  }
}

/**
 * Get Message Templates
 * @param {string} wabaId - WhatsApp Business Account ID
 */
export async function getMessageTemplates(wabaId) {
  try {
    const response = await ApiService.get(`${wabaId}/message_templates`);
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.error?.message || error.message,
      icon: "error",
    });
    return null;
  }
}
