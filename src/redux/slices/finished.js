import { createSlice } from '@reduxjs/toolkit';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

const initialState = {
  finished: null,
  finishedStatus: {
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
  },
});

export default slice.reducer;

export function getFinishedReq(id) {
  return async (dispatch) => {
    dispatch(slice.actions.getFinishedStart());
    try {
      const response = await axios.get(`${API_ENDPOINTS.finished.root}/${id}`);
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
