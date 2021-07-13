import axios from "axios";

export const api = axios.create({
  baseURL: "https://agile-hollows-01374.herokuapp.com",
});

export const vercelApi = axios.create({
  baseURL: "https://mce-onboarding-b0e47dg7c-savio591.vercel.app",
});

