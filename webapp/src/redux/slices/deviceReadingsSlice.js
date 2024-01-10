// deviceReadingsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllDevicesReadings,
  fetchCoachByDeviceReadings,
  fetchAxleByCoach,
} from "../../services/deviceReadingsService";

const initialState = {
  deviceReadings: [],
  coachByDeviceData: [],
  axleByCoashData: [],
};

export const deviceReadingsSlice = createSlice({
  name: "deviceReadings",
  initialState,
  reducers: {
    getAllDeviceReadings: (state, action) => {
      state.deviceReadings = action.payload;
    },
    getCoachByDeviceReading: (state, action) => {
      state.coachByDeviceData = action.payload;
    },
    getAxleByCoach: (state, action) => {
      state.axleByCoashData = action.payload;
    },
  },
});

export const { getAllDeviceReadings, getCoachByDeviceReading, getAxleByCoach } =
  deviceReadingsSlice.actions;

// Thunk actions for fetching data asynchronously

export const fetchDeviceReadings =
  (paramObj = null) =>
  async (dispatch) => {
    try {
      const data = await fetchAllDevicesReadings(paramObj);
      dispatch(getAllDeviceReadings(data));
    } catch (error) {
      console.error("Error fetching device readings:", error);
    }
  };

export const fetchCoachByDeviceReading =
  (deviceReadingId = null) =>
  async (dispatch) => {
    try {
      const data = await fetchCoachByDeviceReadings(deviceReadingId);
      dispatch(getCoachByDeviceReading(data));
    } catch (error) {
      console.error("Error fetching coach by devce readings:", error);
    }
  };

export const fetchAxleByCoachData =
  (deviceReadingId = null) =>
  async (dispatch) => {
    try {
      const data = await fetchAxleByCoach(deviceReadingId);
      dispatch(getAxleByCoach(data));
    } catch (error) {
      console.error("Error fetching axle data by coach:", error);
    }
  };

export const selectDeviceReadings = (state) => state?.reducer?.deviceReadings;

export default deviceReadingsSlice.reducer;
