import { createSlice } from '@reduxjs/toolkit';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

const initialState = {
  training: null,
  trainingStatus: {
    loading: false,
    error: null,
    empty: false,
  },
};

const slice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    getTrainingStart(state) {
      state.training = null;
      state.trainingStatus.loading = true;
      state.trainingStatus.error = null;
      state.trainingStatus.empty = false;
    },
    getTrainingFailure(state, action) {
      state.training = null;
      state.trainingStatus.loading = false;
      state.trainingStatus.error = action.payload;
      state.trainingStatus.empty = false;
    },
    getTrainingSuccess(state, action) {
      const training = action.payload;

      state.training = training;
      state.trainingStatus.loading = false;
      state.trainingStatus.error = null;
      state.trainingStatus.empty = !training.length || training.length === 0;
    },
  },
});

export default slice.reducer;

export function getTraining(id) {
  return async (dispatch) => {
    dispatch(slice.actions.getTrainingStart());
    try {
      const response = await axios.get(`${API_ENDPOINTS.training}/${id}`);
      dispatch(slice.actions.getTrainingSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getTrainingFailure(error));
    }
  };
}
