import axios from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

export const BASE_URL = process.env.REACT_APP_API_URL;

const client = axios.create({ baseURL: BASE_URL });

client.interceptors.response.use((response) => {
  if (
    response.data &&
    response.headers["content-type"] === "application/json"
  ) {
    response.data = camelizeKeys(response.data);
  }
  return response;
});

client.interceptors.request.use((config) => {
  const newConfig = { ...config };

  const tokenData = localStorage.getItem("token");
  if (tokenData) {
    const token = JSON.parse(tokenData);
    newConfig.headers.authorization = `Bearer ${token.accessToken}`;
  }

  if (newConfig.headers["Content-Type"] === "multipart/form-data") {
    return newConfig;
  }

  if (config.params) {
    newConfig.params = decamelizeKeys(config.params);
  }

  if (config.data) {
    newConfig.data = decamelizeKeys(config.data);
  }

  return newConfig;
});

export default client;
