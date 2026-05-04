import axios from "axios";

const API = axios.create({
  baseURL: "https://bookingproject-production-a88d.up.railway.app/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;