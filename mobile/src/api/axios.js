import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

import {
  getToken
} from "../storage/tokenStorage";

const API_URL = process.env.EXPO_PUBLIC_API_URL || (
  Platform.OS === "android"
    ? "http://10.0.2.2:3000/api"
    : (
      (() => {
        const hostUri =
          Constants.expoConfig?.hostUri ||
          Constants.expoGoConfig?.debuggerHost ||
          "";

        const host = hostUri.split(":")[0];

        return host ? `http://${host}:3000/api` : "http://localhost:3000/api";
      })()
    )
);

const API = axios.create({
  baseURL: API_URL
});

API.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
