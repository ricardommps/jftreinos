import { createSlice } from '@reduxjs/toolkit';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
const initialState = {
  programs: null,
  programsStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  programDetail: null,
  programDetailStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  finishedtraining: null,
  finishedtrainingDetailStatus: {
    loading: false,
    error: null,
  },
  trainings: null,
  trainingsStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  finishedList: null,
  finishedListStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  viewedSuccess: false,
  viewedError: false,
  viewPdf: false,
  viewPdfStatus: {
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getProgramsStart(state) {
      state.programs = null;
      state.programsStatus.loading = true;
      state.programsStatus.error = null;
      state.programsStatus.empty = false;
      state.programDetail = null;
      state.programDetailStatus.loading = false;
      state.programDetailStatus.error = null;
      state.programDetailStatus.empty = false;
      state.finishedtraining = null;
      state.finishedtrainingDetailStatus.loading = false;
      state.finishedtrainingDetailStatus.error = null;
      state.finishedList = null;
      state.finishedListStatus.loading = false;
      state.finishedListStatus.error = null;
      state.finishedListStatus.empty = false;
    },
    getProgramsFailure(state, action) {
      state.programs = null;
      state.programsStatus.loading = false;
      state.programsStatus.error = action.payload;
      state.programsStatus.empty = false;
    },
    getProgramsSuccess(state, action) {
      const programs = action.payload;

      state.programs = programs;
      state.programsStatus.loading = false;
      state.programsStatus.error = null;
      state.programsStatus.empty = false;
    },
    getProgramDetailStart(state) {
      state.programDetail = null;
      state.programDetailStatus.loading = true;
      state.programDetailStatus.error = null;
      state.programDetailStatus.empty = false;
      state.trainings = null;
      state.trainingsStatus.loading = false;
      state.trainingsStatus.error = null;
    },
    getProgramDetailFailure(state, action) {
      state.programDetail = null;
      state.programDetailStatus.loading = false;
      state.programDetailStatus.error = action.payload;
      state.programDetailStatus.empty = false;
    },
    getProgramDetailSuccess(state, action) {
      const programDetail = action.payload;

      state.programDetail = programDetail;
      state.programDetailStatus.loading = false;
      state.programDetailStatus.error = null;
      state.programDetailStatus.empty = false;
    },
    finishedtrainingStart(state) {
      state.finishedtraining = null;
      state.finishedtrainingDetailStatus.loading = true;
      state.finishedtrainingDetailStatus.error = null;
    },
    finishedtrainingFailure(state, action) {
      const error = action.payload;

      state.finishedtrainingDetailStatus.error = error;
      state.finishedtraining = null;
      state.finishedtrainingDetailStatus.loading = false;
    },
    finishedtrainingSuccess(state, action) {
      const finishedtraining = action.payload;

      state.finishedtraining = finishedtraining;
      state.finishedtrainingDetailStatus.loading = false;
      state.finishedtrainingDetailStatus.error = null;
    },
    getTrainingsStart(state) {
      state.trainings = null;
      state.trainingsStatus.loading = true;
      state.trainingsStatus.error = null;
    },
    getTrainingsFailure(state, action) {
      const error = action.payload;

      state.trainings = null;
      state.trainingsStatus.loading = false;
      state.trainingsStatus.error = error;
    },
    getTrainingsSuccess(state, action) {
      const trainings = action.payload;

      state.trainings = trainings;
      state.trainingsStatus.loading = false;
      state.trainingsStatus.error = null;
    },
    getFinishedListStart(state) {
      state.finishedList = null;
      state.finishedListStatus.loading = true;
      state.finishedListStatus.error = null;
      state.finishedListStatus.empty = false;
      state.viewedSuccess = false;
      state.viewedError = false;
    },
    getFinishedListFailure(state, action) {
      const error = action.payload;
      state.finishedListStatus.error = error;

      state.finishedList = null;
      state.finishedListStatus.loading = false;
      state.finishedListStatus.empty = false;
    },
    getFinishedListSuccess(state, action) {
      const finishedList = action.payload;
      state.finishedList = finishedList;

      state.finishedListStatus.loading = false;
      state.finishedListStatus.empty = false;
      state.finishedListStatus.error = null;
    },
    viewedFeedBackStart(state) {
      state.viewedSuccess = false;
      state.viewedError = false;
    },
    viewedFeedBackFailure(state) {
      state.viewedSuccess = false;
      state.viewedError = true;
    },
    viewedFeedBackSuccess(state) {
      state.viewedSuccess = true;
      state.viewedError = false;
    },
    getViewPdfStart(state) {
      state.viewPdf = null;
      state.viewPdfStatus.error = null;
      state.viewPdfStatus.loading = true;
    },
    getViewPdfFailure(state, action) {
      state.viewPdfStatus.loading = false;
      state.viewPdfStatus.error = action.payload;
      state.viewPdf = null;
    },
    getViewPdfSuccess(state, action) {
      const viewPdf = action.payload;
      state.viewPdf = viewPdf;

      state.viewPdfStatus.loading = false;
      state.viewPdfStatus.error = null;
    },
    clearViewPdf(state) {
      state.viewPdf = null;
      state.viewPdfStatus.error = null;
      state.viewPdfStatus.loading = false;
    },
  },
});

export default slice.reducer;

export function getAllPrograms() {
  return async (dispatch) => {
    dispatch(slice.actions.getProgramsStart());
    try {
      const response = await axios.get(`${API_ENDPOINTS.home.programs}`);
      dispatch(slice.actions.getProgramsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getProgramsFailure(error));
    }
  };
}

export function getProgramDetail(programId) {
  return async (dispatch) => {
    dispatch(slice.actions.getProgramDetailStart());
    try {
      const response = await axios.get(`${API_ENDPOINTS.home.programDetail}/${programId}`);
      dispatch(getTrainings(response.data.id));
      dispatch(slice.actions.getProgramDetailSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getProgramDetailFailure(error));
    }
  };
}

export function finishedtrainingReq(finishedData) {
  return async (dispatch) => {
    dispatch(slice.actions.finishedtrainingStart());
    try {
      const response = await axios.post(`${API_ENDPOINTS.home.finishedtraining}`, finishedData);
      dispatch(slice.actions.finishedtrainingSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.finishedtrainingFailure(error));
    }
  };
}

export function getTrainings(programId) {
  return async (dispatch) => {
    dispatch(slice.actions.getTrainingsStart());
    try {
      const response = await axios.get(`${API_ENDPOINTS.home.trainingsByProgramId}/${programId}`);
      dispatch(slice.actions.getTrainingsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getTrainingsFailure(error));
    }
  };
}

export function getFinishedListReq(id) {
  return async (dispatch) => {
    dispatch(slice.actions.getFinishedListStart());
    try {
      const response = await axios.get(`${API_ENDPOINTS.home.finishedList}/${id}`);
      dispatch(slice.actions.getFinishedListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getFinishedListFailure(error));
    }
  };
}

export function viewedFeedBack(id) {
  return async (dispatch) => {
    dispatch(slice.actions.viewedFeedBackStart());
    try {
      const response = await axios.get(`${API_ENDPOINTS.home.viewedFeedback}/${id}`);
      dispatch(slice.actions.viewedFeedBackSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.viewedFeedBackFailure(error));
    }
  };
}

export function getViewPdf(programId) {
  return async (dispatch) => {
    dispatch(slice.actions.getViewPdfStart());
    try {
      const response = await axios.get(`${API_ENDPOINTS.home.viewPdf}/${programId}`);
      dispatch(slice.actions.getViewPdfSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getViewPdfFailure(error));
    }
  };
}

export function clearViewPdf() {
  return async (dispatch) => {
    dispatch(slice.actions.clearViewPdf());
  };
}
