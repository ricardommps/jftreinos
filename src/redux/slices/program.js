import { createSlice } from '@reduxjs/toolkit';
import { JF_APP_ENDPOINTS, jfApi } from 'src/utils/axios'; // Note: usando jfAppApi pois o endpoint é do JF_APP

const initialState = {
  program: null,
  programStatus: {
    loading: false,
    error: null,
    empty: false,
  },
};

const slice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    getProgramStart(state) {
      state.program = null;
      state.programStatus.error = null;
      state.programStatus.loading = true;
      state.programStatus.empty = false;
    },
    getProgramSuccess(state, action) {
      const program = action.payload;

      state.program = program;
      state.programStatus.error = null;
      state.programStatus.loading = true;
      state.programStatus.empty = !program;
    },
    getProgramFailure(state, action) {
      const error = action.payload;

      state.program = null;
      state.programStatus.error = error;
      state.programStatus.loading = true;
      state.programStatus.empty = false;
    },
  },
});

export default slice.reducer;

export function getProgram(id) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.getProgramStart(id));
      const response = await jfApi.get(`${JF_APP_ENDPOINTS.program}/${id}`);
      dispatch(slice.actions.getProgramSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getProgramFailure(error.message || error));
    }
  };
}
