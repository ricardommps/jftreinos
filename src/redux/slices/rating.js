import { createSlice } from '@reduxjs/toolkit';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

const initialState = {
  rating: null,
  ratingStatus: {
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    ratingStart(state) {
      state.rating = null;
      state.ratingStatus.loading = true;
      state.ratingStatus.error = null;
    },
    ratingFailure(state, action) {
      state.rating = null;
      state.ratingStatus.loading = false;
      state.ratingStatus.error = action.payload;
    },
    ratingSuccess(state, action) {
      const rating = action.payload;

      state.rating = rating;
      state.ratingStatus.loading = false;
      state.ratingStatus.error = null;
    },
    clearRating(state) {
      state.rating = null;
      state.ratingStatus.loading = false;
      state.ratingStatus.error = null;
    },
  },
});

export default slice.reducer;

export function saveRating(rating) {
  return async (dispatch) => {
    dispatch(slice.actions.ratingStart());
    try {
      const response = await axios.post(`${API_ENDPOINTS.rating.root}`, rating);
      dispatch(slice.actions.ratingSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.ratingFailure(error));
    }
  };
}

export function getRating() {
  return async (dispatch) => {
    dispatch(slice.actions.ratingStart());
    try {
      const response = await axios.get(`${API_ENDPOINTS.rating.root}`);
      dispatch(slice.actions.ratingSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.ratingFailure(error));
    }
  };
}

export function clearRating() {
  return async (dispatch) => {
    dispatch(slice.actions.clearRating());
  };
}
