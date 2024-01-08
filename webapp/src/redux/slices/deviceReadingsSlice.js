// deviceReadingsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllDevicesReadings} from '../../services/deviceReadingsService';

const initialState = {
  devicesReadings: [],
};

export const deviceReadingsSlice = createSlice({
  name: 'deviceReadings',
  initialState,
  reducers: {
    getAllDeviceReadings: (state, action) => {
      state.devicesReadings = action.payload;
    },
  },
});

export const { getAllDeviceReadings } = deviceReadingsSlice.actions;

// Thunk actions for fetching data asynchronously

export const fetchDeviceReadings = (paramObj = null) => async (dispatch) => {
  try {
    const devices = await fetchAllDevicesReadings(paramObj);
    dispatch(getAllDeviceReadings(devices));
  } catch (error) {
    console.error('Error fetching device readings:', error);
  }
};

export const selectDeviceReadings = (state) => state.reducer?.deviceReadings;

export default deviceReadingsSlice.reducer;
