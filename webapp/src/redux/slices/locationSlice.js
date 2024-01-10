// locationSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllZones,
  fetchAllDivisions,
  fetchAllStations,
  fetchAllDevices,
  fetchAllDeviceStatusBulk
} from "../../services/locationService";

const initialState = {
  zones: [],
  divisions: [],
  stations: [],
  devices: [],
  deviceBulkStatus: []
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    getAllZones: (state, action) => {
      state.zones = action.payload;
    },
    getAllDivisions: (state, action) => {
      state.divisions = action.payload;
    },
    getAllStations: (state, action) => {
      state.stations = action.payload;
    },
    getAllDevices: (state, action) => {
      state.devices = action.payload;
    },
    getAllDeviceBulkStatus: (state, action) => {
      state.deviceBulkStatus = action.payload;
    }
  },
});

export const {
  getAllZones,
  getAllDivisions,
  getAllStations,
  getAllDevices,
  getAllDeviceBulkStatus,
} = locationSlice.actions;

// Thunk actions for fetching data asynchronously
export const fetchZones = () => async (dispatch) => {
  try {
    const zones = await fetchAllZones();
    dispatch(getAllZones(zones));
  } catch (error) {
    console.error("Error fetching zones:", error);
  }
};

export const fetchDivisions = () => async (dispatch) => {
  try {
    const divisions = await fetchAllDivisions();
    dispatch(getAllDivisions(divisions));
  } catch (error) {
    console.error("Error fetching divisions:", error);
  }
};

export const fetchStations = () => async (dispatch) => {
  try {
    const stations = await fetchAllStations();
    dispatch(getAllStations(stations));
  } catch (error) {
    console.error("Error fetching stations:", error);
  }
};

export const fetchDevices =
  (paramObj = null) =>
  async (dispatch) => {
    try {
      const devices = await fetchAllDevices(paramObj);
      dispatch(getAllDevices(devices));
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

export const fetchDeviceBulkStatus =
  (paramObj = null) =>
  async (dispatch) => {
    try {
      const devices = await fetchAllDeviceStatusBulk(paramObj);
      dispatch(getAllDeviceBulkStatus(devices));
    } catch (error) {
      console.error("Error fetching device bulk status:", error);
    }
  };

export const selectLocation = (state) => state.reducer?.location;

export default locationSlice.reducer;
