// deviceReadingsService.js
import axios from "axios";
import {
  BASE_URL,
  GET_DEVICE_READINGS,
  GET_COACH_BY_DEVICE_READINGS,
  GET_AXLE_BY_COACH
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

export const fetchCoachByDeviceReadings = async (deviceReadingId) => {
  const token = await getToken();
  const url = `${BASE_URL}${GET_COACH_BY_DEVICE_READINGS}/${deviceReadingId}`;

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

export const fetchAxleByCoach = async (coachId) => {
  const token = await getToken();
  const url = `${BASE_URL}${GET_AXLE_BY_COACH}/${coachId}`;

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
