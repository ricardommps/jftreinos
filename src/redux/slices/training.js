import { createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS, jfAppApi } from 'src/utils/axios';

const initialState = {
  training: null,
  trainingStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  workoutLoad: null,
  workoutLoadStatus: {
    loading: false,
    error: null,
    empty: false,
  },

  saveWorkoutLoad: null,
  saveWorkoutLoadStatus: {
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

      state.workoutLoad = null;
      state.workoutLoadStatus.loading = false;
      state.workoutLoadStatus.error = null;
      state.workoutLoadStatus.empty = false;

      state.saveWorkoutLoad = null;
      state.saveWorkoutLoadStatus.loading = false;
      state.saveWorkoutLoadStatus.error = null;
      state.saveWorkoutLoadStatus.empty = false;
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

    getWorkoutLoadStart(state) {
      state.workoutLoad = null;
      state.workoutLoadStatus.loading = true;
      state.workoutLoadStatus.error = null;
      state.workoutLoadStatus.empty = false;

      state.saveWorkoutLoad = null;
      state.saveWorkoutLoadStatus.loading = false;
      state.saveWorkoutLoadStatus.error = null;
      state.saveWorkoutLoadStatus.empty = false;
    },
    getWorkoutLoadFailure(state, action) {
      state.workoutLoad = null;
      state.workoutLoadStatus.loading = false;
      state.workoutLoadStatus.error = action.payload;
      state.workoutLoadStatus.empty = false;
    },
    getWorkoutLoadSuccess(state, action) {
      const workoutLoad = action.payload;

      state.workoutLoad = workoutLoad;
      state.workoutLoadStatus.loading = false;
      state.workoutLoadStatus.error = null;
      state.workoutLoadStatus.empty = !workoutLoad.length || workoutLoad.length === 0;
    },

    saveWorkoutLoadStart(state) {
      state.saveWorkoutLoad = null;
      state.saveWorkoutLoadStatus.loading = true;
      state.saveWorkoutLoadStatus.error = null;
      state.saveWorkoutLoadStatus.empty = false;
    },
    saveWorkoutLoadFailure(state, action) {
      state.saveWorkoutLoad = null;
      state.saveWorkoutLoadStatus.loading = false;
      state.saveWorkoutLoadStatus.error = action.payload;
      state.saveWorkoutLoadStatus.empty = false;
    },
    saveWorkoutLoadSuccess(state, action) {
      const saveWorkoutLoad = action.payload;

      state.saveWorkoutLoad = saveWorkoutLoad;
      state.saveWorkoutLoadStatus.loading = false;
      state.saveWorkoutLoadStatus.error = null;
    },
  },
});

export default slice.reducer;

export function getTraining(id) {
  return async (dispatch) => {
    dispatch(slice.actions.getTrainingStart());
    try {
      const response = await jfAppApi.get(`${API_ENDPOINTS.training}/${id}`);
      dispatch(slice.actions.getTrainingSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getTrainingFailure(error));
    }
  };
}

export function getWorkoutLoad(id) {
  return async (dispatch) => {
    dispatch(slice.actions.getWorkoutLoadStart());
    try {
      const response = await jfAppApi.get(`${API_ENDPOINTS.workoutLoad}/${id}`);
      dispatch(slice.actions.getWorkoutLoadSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getWorkoutLoadFailure(error));
    }
  };
}

export function saveWorkoutLoadReq(id, load) {
  return async (dispatch) => {
    dispatch(slice.actions.saveWorkoutLoadStart());
    try {
      const response = await jfAppApi.post(`${API_ENDPOINTS.workoutLoad}/${id}`, { load: load });
      dispatch(slice.actions.saveWorkoutLoadSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.saveWorkoutLoadFailure(error));
    }
  };
}
