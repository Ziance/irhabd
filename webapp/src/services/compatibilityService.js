// CompatibilityService.js
import axios from "axios";
import {
  BASE_URL,
  GET_COMPATIBILITY,
} from "../utils/endpoints";

const getToken = () => {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData).token;
};

export const fetchCompatibility = async () => {
  const token = await getToken();
  let url = `${BASE_URL}${GET_COMPATIBILITY}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else return [];
  } catch (error) {
    throw error;
  }
};
