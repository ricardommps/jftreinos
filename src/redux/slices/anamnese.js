import { createSlice } from '@reduxjs/toolkit';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

const initialState = {
  checkEmail: null,
  checkEmailStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  anamneseCreate: null,
  anamneseCreateStatus: {
    loading: false,
    error: null,
    empty: false,
  },
};

const slice = createSlice({
  name: 'anamnese',
  initialState,
  reducers: {
    getCheckEmailStart(state) {
      state.checkEmail = null;
      state.checkEmailStatus.loading = true;
      state.checkEmailStatus.error = null;
      state.checkEmailStatus.empty = false;
    },
    getCheckEmailFailure(state, action) {
      state.checkEmail = null;
      state.checkEmailStatus.loading = false;
      state.checkEmailStatus.error = action.payload;
      state.checkEmailStatus.empty = false;
    },
    getCheckEmailSuccess(state) {
      state.checkEmail = 'Success';
      state.checkEmailStatus.loading = false;
      state.checkEmailStatus.error = false;
      state.checkEmailStatus.empty = false;
    },
    clearCheckEmail(state) {
      state.checkEmail = null;
      state.checkEmailStatus.loading = false;
      state.checkEmailStatus.error = false;
      state.checkEmailStatus.empty = false;
    },
    createAnamneseStart(state) {
      state.anamneseCreate = null;
      state.anamneseCreateStatus.loading = true;
      state.anamneseCreateStatus.error = null;
      state.anamneseCreateStatus.empty = false;
    },
    createAnamneseFailure(state, action) {
      state.anamneseCreate = null;
      state.anamneseCreateStatus.loading = false;
      state.anamneseCreateStatus.error = action.payload;
      state.anamneseCreateStatus.empty = false;
    },
    createAnamneseSuccess(state, action) {
      state.anamneseCreate = action.payload;
      state.anamneseCreateStatus.loading = false;
      state.anamneseCreateStatus.error = null;
      state.anamneseCreateStatus.empty = false;
    },
    clearAnamneseState(state) {
      state.checkEmail = null;
      state.checkEmailStatus.loading = false;
      state.checkEmailStatus.error = false;
      state.checkEmailStatus.empty = false;
      state.anamneseCreate = null;
      state.anamneseCreateStatus.loading = false;
      state.anamneseCreateStatus.error = null;
      state.anamneseCreateStatus.empty = false;
    },
  },
});

export default slice.reducer;

export function getCheckEmailReq(customerEmail) {
  return async (dispatch) => {
    dispatch(slice.actions.getCheckEmailStart());
    try {
      const response = await axios.post(`${API_ENDPOINTS.customer.checkEmail}`, customerEmail);
      dispatch(slice.actions.getCheckEmailSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getCheckEmailFailure(error));
    }
  };
}

export function createAnamneseReq(anamnese) {
  return async (dispatch) => {
    dispatch(slice.actions.createAnamneseStart());
    try {
      const response = await axios.post(`${API_ENDPOINTS.anamnese.create}`, anamnese);
      dispatch(slice.actions.createAnamneseSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.createAnamneseFailure(error));
    }
  };
}

export function clearCheckEmail() {
  return async (dispatch) => {
    dispatch(slice.actions.clearCheckEmail());
  };
}

export function clearAnamneseState() {
  return async (dispatch) => {
    dispatch(slice.actions.clearAnamneseState());
  };
}
