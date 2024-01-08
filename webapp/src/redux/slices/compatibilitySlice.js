// compatibilitySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchCompatibility} from '../../services/compatibilityService';

const initialState = {
  compatibility: [],
};

export const compatibilitySlice = createSlice({
  name: 'compatibility',
  initialState,
  reducers: {
    getCompatibilityDetails: (state, action) => {
      state.compatibility = action.payload;
    },
  },
});

export const { getCompatibilityDetails } = compatibilitySlice.actions;

// Thunk actions for fetching data asynchronously

export const fetchCompatibilityDetails = () => async (dispatch) => {
  try {
    const compatibilityData = await fetchCompatibility();
    dispatch(getCompatibilityDetails(compatibilityData));
  } catch (error) {
    console.error('Error fetching compatibility:', error);
  }
};

export const selectCompatibility = (state) => state.reducer?.compatibility;

export default compatibilitySlice.reducer;
