// src/lib/api.ts
import axios from "axios";

// Single axios instance, baseURL from VITE_API_BASE_URL. Use this instance
// rather than raw axios or fetch so every request goes through one place.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
