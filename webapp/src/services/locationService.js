// locationService.js
import axios from "axios";
import { BASE_URL, GET_ALL_DIVISIONS, GET_ALL_STATIONS, GET_ALL_ZONES, GET_DEVICES } from "../utils/endpoints";

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
    } else return []
  } catch (error) {
    console.error("Error in getting zones details:", error);
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
    } else return []
  } catch (error) {
    console.error("Error in getting division details:", error);
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
    } else return []
  } catch (error) {
    console.error("Error in getting station details:", error);
    throw error;
  }
};

export const fetchAllDevices = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}${GET_DEVICES}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else return []
  } catch (error) {
    console.error("Error in getting devices:", error);
    throw error;
  }
};
