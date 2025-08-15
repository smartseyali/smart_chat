import axios from "axios";
import { database } from "./SupabaseService";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_WHATSAPP_API_URL;

let cachedToken = null; // Store token in memory to avoid fetching every time

// Function to fetch and cache token from Supabase
async function fetchToken() {
  if (cachedToken) return cachedToken;

  try {
    database
      .get("waba_accounts", { status: "active" })
      .then((data) => {
        cachedToken = data[0]?.access_token || null;
        return cachedToken;
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
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
    const token = localStorage.getItem("access_token") || (await fetchToken());
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
  put: (url, data) => apiService.put(url, data),
  delete: (url) => apiService.delete(url),
};
