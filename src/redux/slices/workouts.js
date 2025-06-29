import { createSlice } from '@reduxjs/toolkit';
import { JF_APP_ENDPOINTS, jfApi } from 'src/utils/axios'; // Note: usando jfAppApi pois o endpoint é do JF_APP

const initialState = {
  workoutsNew: [],
  workoutsNewStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  workoutItem: null,
  workoutItemStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  finishedStatus: {
    success: null,
    error: null,
  },
};

const slice = createSlice({
  name: 'workouts', // Corrigido o typo 'woorkouts'
  initialState,
  reducers: {
    getWorkoutsStart(state) {
      state.workoutsNew = [];
      state.workoutsNewStatus.loading = true;
      state.workoutsNewStatus.error = null;
      state.workoutsNewStatus.empty = false;
      state.workoutItem = null;
      state.workoutItemStatus.error = null;
      state.workoutItemStatus.loading = false;
      state.workoutItemStatus.empty = false;
      state.finishedStatus = {
        success: null,
        error: null,
      };
    },
    getWorkoutsSuccess(state, action) {
      const workouts = action.payload;
      state.workoutsNew = workouts;
      state.workoutsNewStatus.loading = true;
      state.workoutsNewStatus.error = null;
      state.workoutsNewStatus.empty = !workouts.length || workouts.length === 0;
    },
    getWorkoutsFailure(state, action) {
      const error = action.payload;
      state.workoutsNew = [];
      state.workoutsNewStatus.loading = true;
      state.workoutsNewStatus.error = error;
      state.workoutsNewStatus.empty = false;
    },
    getWorkoutItemStart(state) {
      state.workoutItem = null;
      state.workoutItemStatus.error = null;
      state.workoutItemStatus.loading = true;
      state.workoutItemStatus.empty = false;
    },
    getWorkoutItemSuccess(state, action) {
      const workoutItem = action.payload;

      state.workoutItem = workoutItem;
      state.workoutItemStatus.error = null;
      state.workoutItemStatus.loading = true;
      state.workoutItemStatus.empty = !workoutItem;
    },
    getWorkoutItemFailure(state, action) {
      const error = action.payload;

      state.workoutItem = null;
      state.workoutItemStatus.error = error;
      state.workoutItemStatus.loading = true;
      state.workoutItemStatus.empty = false;
    },
    finishedStart(state) {
      state.finishedStatus = {
        success: null,
        error: null,
      };
    },
    finishedSuccess(state, action) {
      state.finishedStatus = {
        success: action.payload,
        error: null,
      };
    },
    finishedFailure(state, action) {
      state.finishedStatus = {
        success: null,
        error: action.payload,
      };
    },
  },
});

export default slice.reducer;

export function getWorkouts(programId, type) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.getWorkoutsStart());
      const response = await jfApi.get(
        `${JF_APP_ENDPOINTS.workouts}/list?programId=${programId}${
          type === 1 ? '&running=true' : '&running=false'
        }`,
      );
      dispatch(slice.actions.getWorkoutsSuccess(response.data));
    } catch (error) {
      console.log('----error', error);
      dispatch(slice.actions.getWorkoutsFailure(error.message || error));
    }
  };
}

export function getWorkoutItem(id) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.getWorkoutItemStart());
      const response = await jfApi.get(`${JF_APP_ENDPOINTS.workouts}/workout?id=${id}`);
      dispatch(slice.actions.getWorkoutItemSuccess(response.data));
    } catch (error) {
      console.log('----error', error);
      dispatch(slice.actions.getWorkoutItemFailure(error.message || error));
    }
  };
}

export function finishedRequest(payload) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.finishedStart());
      const response = await jfApi.post(JF_APP_ENDPOINTS.finished, payload);
      dispatch(slice.actions.finishedSuccess(response.data));
    } catch (error) {
      console.log('----error', error);
      dispatch(slice.actions.finishedFailure(error.message || error));
    }
  };
}
