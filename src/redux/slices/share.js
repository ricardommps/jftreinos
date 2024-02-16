// const defaultShere = {
//   distance: '',
//   duration: '',
//   pace: '',
//   intensities: [],
//   trainingsubtitle: '',
//   trainingdatepublished: '',
//   trainingname: '',
//   typetraining: '',
//   unitmeasurement: '',
// };

//subtitle={finishedtraining.training.subtitle}
// datePublished={finishedtraining.training.datePublished}
// module={finishedtraining?.training?.name}
// typetraining={finishedtraining?.typetraining}
// datePublished={finishedtraining.training.datePublished}
// distance={finishedtraining.distance}
// duration={finishedtraining.duration}
// pace={finishedtraining.pace}
// intensities={finishedtraining.intensities}

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  share: null,
  shareOpen: false,
};

const shareFormated = (data) => {
  const newData = {
    distance: data.distance,
    duration: data.duration,
    pace: data.pace,
    intensities: data.intensities,
    training: {
      subtitle: data.trainingsubtitle,
      datePublished: data.trainingdatepublished,
      name: data.trainingname,
    },
    typetraining: data.typetraining,
    unitmeasurement: data.unitmeasurement,
  };
  return newData;
};

const slice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    getShare(state, action) {
      state.share = action.payload;
    },
    getShareAndFormated(state, action) {
      state.share = action.payload;
      state.shareOpen = true;
    },
    clearShare(state) {
      state.share = null;
      state.shareOpen = false;
    },
    setShareOpen(state, action) {
      state.shareOpen = action.payload;
    },
  },
});

export default slice.reducer;

export function getShare(data) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.getShare(data));
    } catch (error) {
      console.error(error);
    }
  };
}

export function getShareAndFormated(data) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.getShareAndFormated(shareFormated(data)));
    } catch (error) {
      console.error(error);
    }
  };
}

export function clearShare() {
  return async (dispatch) => {
    dispatch(slice.actions.clearShare());
  };
}

export function setShareOpen(value) {
  return async (dispatch) => {
    dispatch(slice.actions.setShareOpen(value));
  };
}
