import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

/**
 * Single shared axios instance. Use this everywhere instead of raw
 * axios/fetch so base URL, timeout, and (later) interceptors stay consistent.
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});
