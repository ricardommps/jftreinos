import { createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS, jfAppApi } from 'src/utils/axios';
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
  myData: null,
  myDataStatus: {
    loading: false,
    error: null,
  },
  upload: null,
  uploadStatus: {
    loading: false,
    error: null,
  },
  alertOverdue: false,
  alertOverdueHide: false,
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
      state.finishedListStatus.empty = !finishedList.length || finishedList.length === 0;
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
    clearFinishedtraining(state) {
      state.finishedtraining = null;
      state.finishedtrainingDetailStatus.loading = false;
      state.finishedtrainingDetailStatus.error = null;
    },

    getMyDataStart(state) {
      state.myData = null;
      state.myDataStatus.error = null;
      state.myDataStatus.loading = true;
    },
    getMyDataFailure(state, action) {
      state.myDataStatus.loading = false;
      state.myDataStatus.error = action.payload;
      state.myData = null;
    },
    getMyDataSuccess(state, action) {
      const myData = action.payload;
      state.myData = myData;

      state.myDataStatus.loading = false;
      state.myDataStatus.error = null;
    },

    uploadStart(state) {
      state.upload = null;
      state.uploadStatus.error = null;
      state.uploadStatus.loading = true;
    },
    uploadFailure(state, action) {
      state.uploadStatus.loading = false;
      state.uploadStatus.error = action.payload;
      state.upload = null;
    },
    uploadSuccess(state, action) {
      const upload = action.payload;
      state.upload = upload;

      state.uploadStatus.loading = false;
      state.uploadStatus.error = null;
    },
    showAlertOverdue(state) {
      state.alertOverdue = true;
    },

    hideAlertOverdue(state) {
      state.alertOverdue = false;
      state.alertOverdueHide = true;
    },
  },
});

export default slice.reducer;

export function getAllPrograms() {
  return async (dispatch) => {
    dispatch(slice.actions.getProgramsStart());
    try {
      const response = await jfAppApi.get(`${API_ENDPOINTS.home.programs}`);
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
      const response = await jfAppApi.get(`${API_ENDPOINTS.home.programDetail}/${programId}`);
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
      const response = await jfAppApi.post(`${API_ENDPOINTS.home.finishedtraining}`, finishedData);
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
      const response = await jfAppApi.get(
        `${API_ENDPOINTS.home.trainingsByProgramId}/${programId}`,
      );
      dispatch(slice.actions.getTrainingsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getTrainingsFailure(error));
    }
  };
}

export function getFinishedListReq(timestampFrom, timestampTo) {
  return async (dispatch) => {
    dispatch(slice.actions.getFinishedListStart());
    try {
      const finishedTraining = await jfAppApi.get(
        `${API_ENDPOINTS.home.finishedList}?timestampFrom=${timestampFrom}&timestampTo=${timestampTo}`,
      );
      const finished = await jfAppApi.get(
        `${API_ENDPOINTS.finished.root}/listByUser?timestampFrom=${timestampFrom}&timestampTo=${timestampTo}`,
      );
      const response = [...finished.data, ...finishedTraining.data];
      dispatch(slice.actions.getFinishedListSuccess(response));
    } catch (error) {
      dispatch(slice.actions.getFinishedListFailure(error));
    }
  };
}

export function viewedFeedBack(id) {
  return async (dispatch) => {
    dispatch(slice.actions.viewedFeedBackStart());
    try {
      const response = await jfAppApi.get(`${API_ENDPOINTS.home.viewedFeedback}/${id}`);
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
      const response = await jfAppApi.get(`${API_ENDPOINTS.home.viewPdf}/${programId}`);
      dispatch(slice.actions.getViewPdfSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getViewPdfFailure(error));
    }
  };
}

export function getMyData() {
  return async (dispatch) => {
    dispatch(slice.actions.getMyDataStart());
    try {
      const response = await jfAppApi.get(API_ENDPOINTS.myData);
      dispatch(slice.actions.getMyDataSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getMyDataFailure(error));
    }
  };
}

export function uploadFile(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.uploadStart());
    try {
      const response = await jfAppApi.patch(API_ENDPOINTS.upload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(slice.actions.uploadSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.uploadFailure(error));
    }
  };
}

export function clearViewPdf() {
  return async (dispatch) => {
    dispatch(slice.actions.clearViewPdf());
  };
}

export function clearFinishedtraining() {
  return async (dispatch) => {
    dispatch(slice.actions.clearFinishedtraining());
  };
}

export function showAlertOverdueAction() {
  return async (dispatch) => {
    dispatch(slice.actions.showAlertOverdue());
  };
}

export function hideAlertOverdueAction() {
  return async (dispatch) => {
    dispatch(slice.actions.hideAlertOverdue());
  };
}
