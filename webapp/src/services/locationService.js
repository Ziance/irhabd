// locationService.js
import axios from "axios";
import {
  BASE_URL,
  GET_ALL_DIVISIONS,
  GET_ALL_STATIONS,
  GET_ALL_ZONES,
  GET_DEVICES,
  GET_DEVICE_STATUS_BULK,
} from "../utils/endpoints";

const getToken = () => {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData).token;
};

export const fetchAllZones = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}${GET_ALL_ZONES}`, {
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

export const fetchAllDivisions = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}${GET_ALL_DIVISIONS}`, {
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

export const fetchAllStations = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}${GET_ALL_STATIONS}`, {
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

export const fetchAllDevices = async (paramObj = null) => {
  const token = await getToken();
  let url = `${BASE_URL}${GET_DEVICES}`;
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

export const fetchAllDeviceStatusBulk = async (paramObj = null) => {
  const token = await getToken();
  let url = `${BASE_URL}${GET_DEVICE_STATUS_BULK}`;
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
