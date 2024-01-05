// locationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllZones, fetchAllDivisions, fetchAllStations} from '../../services/locationService';

const initialState = {
  zones: [],
  divisions: [],
  stations: [],
};

export const locationSlice = createSlice({
  name: 'location',
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
  },
});

export const { getAllZones, getAllDivisions, getAllStations } = locationSlice.actions;

// Thunk actions for fetching data asynchronously
export const fetchZones = () => async (dispatch) => {
  try {
    const zones = await fetchAllZones();
    dispatch(getAllZones(zones));
  } catch (error) {
    console.error('Error fetching zones:', error);
  }
};

export const fetchDivisions = () => async (dispatch) => {
  try {
    const divisions = await fetchAllDivisions();
    dispatch(getAllDivisions(divisions));
  } catch (error) {
    console.error('Error fetching divisions:', error);
  }
};

export const fetchStations = () => async (dispatch) => {
  try {
    const stations = await fetchAllStations();
    dispatch(getAllStations(stations));
  } catch (error) {
    console.error('Error fetching stations:', error);
  }
};

export const selectLocation = (state) => state.reducer?.location;

export default locationSlice.reducer;
