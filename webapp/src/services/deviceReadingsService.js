// deviceReadingsService.js
import axios from "axios";
import {
  BASE_URL,
  GET_DEVICE_READINGS,
} from "../utils/endpoints";

const getToken = () => {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData).token;
};

export const fetchAllDevicesReadings = async (paramObj = null) => {
  const token = await getToken();
  let url = `${BASE_URL}${GET_DEVICE_READINGS}`;
  if (paramObj) {
    const queryString = Object.keys(paramObj)
      .filter((key) => paramObj[key] !== undefined && paramObj[key] !== null)
      .map((key) => `${key}=${encodeURIComponent(paramObj[key])}`)
      .join("&");

    if (queryString) {
      url += `?${queryString}`;
    }
  }

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
