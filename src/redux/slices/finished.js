import { createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS, jfAppApi } from 'src/utils/axios';

const initialState = {
  finished: null,
  finishedStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  volume: [],
  valumeStatus: {
    loading: false,
    error: null,
    empty: false,
  },
};

const slice = createSlice({
  name: 'finished',
  initialState,
  reducers: {
    getFinishedStart(state) {
      state.finished = null;
      state.finishedStatus.loading = true;
      state.finishedStatus.error = null;
      state.finishedStatus.empty = false;
    },
    getFinishedFailure(state, action) {
      state.finished = null;
      state.finishedStatus.loading = false;
      state.finishedStatus.error = action.payload;
      state.finishedStatus.empty = false;
    },
    getFinishedSuccess(state, action) {
      state.finished = action.payload;
      state.finishedStatus.loading = false;
      state.finishedStatus.error = false;
      state.finishedStatus.empty = false;
    },
    clearFinishedState(state) {
      state.finished = null;
      state.finishedStatus.loading = false;
      state.finishedStatus.error = null;
      state.finishedStatus.empty = false;
    },
    getVolumeStart(state) {
      state.volume = null;
      state.valumeStatus.loading = true;
      state.valumeStatus.error = null;
      state.valumeStatus.empty = false;
    },
    getVolumeFailure(state, action) {
      state.volume = null;
      state.valumeStatus.loading = false;
      state.valumeStatus.error = action.payload;
      state.valumeStatus.empty = false;
    },
    getVolumeSuccess(state, action) {
      state.volume = action.payload;
      state.valumeStatus.loading = false;
      state.valumeStatus.error = false;
      state.valumeStatus.empty = false;
    },
    clearVolume(state) {
      state.volume = [];
      state.valumeStatus.loading = false;
      state.valumeStatus.error = null;
      state.valumeStatus.empty = false;
    },
  },
});

export default slice.reducer;

export function getFinishedReq(id) {
  return async (dispatch) => {
    dispatch(slice.actions.getFinishedStart());
    try {
      const response = await jfAppApi.get(`${API_ENDPOINTS.finished.root}/${id}`);
      dispatch(slice.actions.getFinishedSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getFinishedFailure(error));
    }
  };
}

export function clearFinishedStateReq() {
  return async (dispatch) => {
    dispatch(slice.actions.clearFinishedState());
  };
}

export function getVolume(programId, startDate, endDate) {
  return async (dispatch) => {
    dispatch(slice.actions.getVolumeStart());
    try {
      const response = await jfAppApi.get(
        `${API_ENDPOINTS.finished.volume}?programId=${programId}&startDate=${startDate}&endDate=${endDate}`,
      );
      dispatch(slice.actions.getVolumeSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getVolumeFailure(error));
    }
  };
}

export function clearVolume() {
  return async (dispatch) => {
    dispatch(slice.actions.clearVolume());
  };
}
