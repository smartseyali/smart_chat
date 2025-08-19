import axios from "axios";
import { database } from "./SupabaseService";
import Swal from "sweetalert2";
import store from "../store";

const API_BASE_URL = import.meta.env.VITE_WHATSAPP_API_URL;

let cachedToken = null; // Store token in memory to avoid fetching every time

// Function to fetch and cache token from Supabase
async function fetchToken() {
  if (cachedToken) return cachedToken;
  try {
    const data = await database.get("waba_accounts", { status: "active" });
    cachedToken = data?.[0]?.access_token || null;
    return cachedToken;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
    console.error("Token fetch error:", error.message);
    return null;
  }
}

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiService.interceptors.request.use(
  async (config) => {
    const stateToken = store.getState()?.auth?.access_token;
    const localToken =
      stateToken ||
      cachedToken ||
      // fallback to localStorage if you persist auth there
      (() => {
        try {
          const stored = localStorage.getItem("auth");
          if (stored) {
            const parsed = JSON.parse(stored);
            return parsed?.access_token || null;
          }
        } catch (_) {
          // ignore
        }
        return null;
      })();
    const token = localToken || (await fetchToken());
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default {
  get: (url, params) => apiService.get(url, { params }),
  post: (url, data) => apiService.post(url, data),
  // For file uploads (multipart/form-data)
  postForm: (url, formData) =>
    apiService.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  put: (url, data) => apiService.put(url, data),
  delete: (url) => apiService.delete(url),
};
