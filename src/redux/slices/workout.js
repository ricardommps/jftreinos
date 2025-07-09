import { createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS, JF_APP_ENDPOINTS, jfApi, jfAppApi } from 'src/utils/axios';

const initialState = {
  workoutAction: null,
  workoutActionStatus: {
    loading: false,
    empty: false,
    error: null,
  },
  workouts: null,
  workoutsStatus: {
    loading: false,
    empty: false,
    error: null,
  },
  workout: null,
  workoutStatus: {
    loading: false,
    empty: false,
    error: null,
  },
  finished: null,
  finishedStatus: {
    loading: false,
    error: null,
  },
};
const slice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    clearStateWorkout(state) {
      state.workouts = null;
      state.workoutStatus.error = null;
      state.workoutStatus.loading = false;
      state.workoutStatus.empty = false;

      state.workoutAction = null;
      state.workoutActionStatus.error = null;
      state.workoutActionStatus.loading = false;

      state.workouts = null;
      state.workoutsStatus.error = null;
      state.workoutsStatus.loading = false;
      state.workoutsStatus.empty = false;
    },
    getWorkoutsStart(state) {
      state.finished = null;
      state.finishedStatus.error = null;
      state.finishedStatus.loading = false;

      state.workouts = null;
      state.workoutStatus.error = null;
      state.workoutStatus.loading = false;
      state.workoutStatus.empty = false;

      state.workoutAction = null;
      state.workoutActionStatus.error = null;
      state.workoutActionStatus.loading = false;

      state.workouts = null;
      state.workoutsStatus.error = null;
      state.workoutsStatus.loading = true;
      state.workoutsStatus.empty = false;
    },
    getWorkoutsSuccess(state, action) {
      const workouts = action.payload;
      state.workouts = workouts;

      state.workoutsStatus.error = null;
      state.workoutsStatus.loading = false;
      state.workoutsStatus.empty = !workouts.length || workouts.length === 0;
    },
    getWorkoutsFailure(state, action) {
      const error = action.payload;

      state.workoutsStatus.error = error;

      state.workouts = null;
      state.workoutsStatus.loading = false;
      state.workoutsStatus.empty = false;
    },

    getWorkoutStart(state) {
      state.workout = null;
      state.workoutStatus.error = null;
      state.workoutStatus.loading = true;
      state.workoutStatus.empty = false;
    },
    getWorkoutSuccess(state, action) {
      const workout = action.payload;
      state.workout = workout;

      state.workoutStatus.error = null;
      state.workoutStatus.loading = false;
      state.workoutStatus.empty = false;
    },
    getWorkoutFailure(state, action) {
      const error = action.payload;

      state.workoutStatus.error = error;

      state.workout = null;
      state.workoutStatus.loading = false;
      state.workoutStatus.empty = false;
    },

    finishedWorkoutStart(state) {
      state.finished = null;
      state.finishedStatus.error = null;
      state.finishedStatus.loading = true;
    },

    finishedWorkoutSuccess(state, action) {
      const finished = action.payload;
      state.finished = finished;

      state.finishedStatus.error = null;
      state.finishedStatus.loading = false;
    },

    finishedWorkoutFailure(state, action) {
      const error = action.payload;
      state.finishedStatus = error;

      state.finished = null;
      state.finishedStatus.loading = false;
    },
  },
});

export default slice.reducer;

let abortController = null;

export function getWorkouts(programId, type) {
  return async (dispatch) => {
    const workoutType = type === 1 ? 'running' : 'gym';
    dispatch(slice.actions.getWorkoutsStart());
    try {
      const response = await jfAppApi.get(
        `${API_ENDPOINTS.workout.root}/${workoutType}/${programId}`,
      );
      dispatch(slice.actions.getWorkoutsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getWorkoutsFailure(error));
      throw error(error);
    }
  };
}

export function getWorkoutsByProgramId(programId, type) {
  return async (dispatch) => {
    const workoutType = type === 1 ? 'running' : 'gym';
    dispatch(slice.actions.getWorkoutsStart());
    try {
      const response = await jfAppApi.get(
        `${API_ENDPOINTS.workout.root}/${workoutType}/${programId}/user`,
      );
      dispatch(slice.actions.getWorkoutsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getWorkoutsFailure(error));
      throw error(error);
    }
  };
}

export function getWorkout(id) {
  return async (dispatch) => {
    dispatch(slice.actions.getWorkoutStart());
    try {
      const response = await jfAppApi.get(`${API_ENDPOINTS.workout.root}/by-id/${id}`);
      dispatch(slice.actions.getWorkoutSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getWorkoutFailure(error));
      throw error(error);
    }
  };
}

export function finishedWorkout(payload, newVersion) {
  return async (dispatch) => {
    // Cancelar a requisição anterior, se existir
    if (abortController) {
      abortController.abort();
    }

    // Criar um novo AbortController
    abortController = new AbortController();

    try {
      dispatch(slice.actions.finishedWorkoutStart());

      let response;

      if (newVersion) {
        response = await jfApi.post(JF_APP_ENDPOINTS.finished, payload, {
          signal: abortController.signal,
        });
      } else {
        response = await jfAppApi.post(API_ENDPOINTS.finished.root, payload, {
          signal: abortController.signal,
        });
      }

      dispatch(slice.actions.finishedWorkoutSuccess(response.data));
      return response;
    } catch (error) {
      if (error.name === 'CanceledError') {
        console.warn('Requisição cancelada:', error.message);
      } else {
        dispatch(slice.actions.finishedWorkoutFailure(error));
        throw error; // apenas relança o erro
      }
    } finally {
      // Resetar o AbortController
      abortController = null;
    }
  };
}

export function clearStateWorkout() {
  return async (dispatch) => {
    dispatch(slice.actions.clearStateWorkout());
  };
}
