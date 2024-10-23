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
  anamneseLogin: null,
  anamneseLoginStatus: {
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

      state.anamneseCreate = null;
      state.anamneseCreateStatus.loading = false;
      state.anamneseCreateStatus.error = null;
      state.anamneseCreateStatus.empty = false;
      state.anamneseLogin = null;
      state.anamneseLoginStatus.loading = false;
      state.anamneseLoginStatus.error = null;
      state.anamneseLoginStatus.empty = false;
    },
    getCheckEmailFailure(state, action) {
      state.checkEmail = null;
      state.checkEmailStatus.loading = false;
      state.checkEmailStatus.error = action.payload;
      state.checkEmailStatus.empty = false;
    },
    getCheckEmailSuccess(state, action) {
      state.checkEmail = action.payload;
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
      state.anamneseLogin = null;
      state.anamneseLoginStatus.loading = false;
      state.anamneseLoginStatus.error = null;
      state.anamneseLoginStatus.empty = false;
    },
    anamneseLoginStart(state) {
      state.anamneseLogin = null;
      state.anamneseLoginStatus.loading = true;
      state.anamneseLoginStatus.error = null;
      state.anamneseLoginStatus.empty = false;
    },
    anamneseLoginFailure(state, action) {
      state.anamneseLogin = null;
      state.anamneseLoginStatus.loading = false;
      state.anamneseLoginStatus.error = action.payload;
      state.anamneseLoginStatus.empty = false;
    },
    anamneseLoginSuccess(state, action) {
      state.anamneseLogin = action.payload;
      state.anamneseLoginStatus.loading = false;
      state.anamneseLoginStatus.error = null;
      state.anamneseLoginStatus.empty = false;
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

export function createAnamneseReq(anamnese, token, id) {
  return async (dispatch) => {
    dispatch(slice.actions.createAnamneseStart());
    try {
      if (token) {
        const payload = {
          customer: {
            id: id,
            name: anamnese.name,
            email: anamnese.email,
            phone: anamnese.phone,
            maritalStatus: anamnese.maritalStatus, //NOVO
            zipCode: anamnese.zipCode, //NOVO
            complement: anamnese.complement, //NOVO
            street: anamnese.street, //NOVO
            streetNumber: anamnese.streetNumber, //NOVO
            city: anamnese.city, //NOVO
            state: anamnese.state, //NOVO
            district: anamnese.district, //NOVO
            fatPercentage: anamnese.fatPercentage, //NOVO
            weight: anamnese.weight,
            height: anamnese.height,
            isRunner: anamnese.isRunner,
            isStrength: anamnese.isStrength,
            gender: anamnese.gender,
            birthDate: new Date(anamnese.birthDate),
            active: anamnese.active,
          },
          anamnese: {
            hasDiabetesOrHypertension: anamnese?.hasDiabetesOrHypertension,
            painOrInjuries: anamnese?.painOrInjuries,
            youSurgery: anamnese?.youSurgery,
            heartDisease: anamnese?.heartDisease,
            disease: anamnese?.disease,
            isPregnant: anamnese?.isPregnant,
            medicationsOrSupplements: anamnese?.medicationsOrSupplements,
            etilismo: anamnese?.etilismo,
            smoking: anamnese?.smoking,
            food: anamnese?.food,
            isVegetarian: anamnese?.isVegetarian,
            isVegan: anamnese?.isVegan,
            physicalActivity: anamnese?.physicalActivity,
            intentionsStartingSportsConsultancy: anamnese?.intentionsStartingSportsConsultancy,
            lookingForRacingAdvice: anamnese?.lookingForRacingAdvice,
            runningExperience: anamnese?.runningExperience,
            longestRunningDistance: anamnese?.longestRunningDistance,
            bestRunningTime: anamnese?.bestRunningTime,
            strengtheningTraining: anamnese?.strengtheningTraining,
            runningCompetitionExperience: anamnese?.runningCompetitionExperience,
            youLookingForRaceConsultancy: anamnese?.youLookingForRaceConsultancy,
            runningEventsFuture: anamnese?.runningEventsFuture,
            raceOnYourFutureCalendar: anamnese?.raceOnYourFutureCalendar,
            daysOfTheWeekRun: anamnese?.daysOfTheWeekRun,
            hasRunningClock: anamnese?.hasRunningClock,
          },
        };
        const response = await axios.post(
          `${API_ENDPOINTS.anamnese.createRegisteredUser}`,
          payload,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );
        dispatch(slice.actions.createAnamneseSuccess(response.data));
      } else {
        const response = await axios.post(`${API_ENDPOINTS.anamnese.create}`, anamnese);
        dispatch(slice.actions.createAnamneseSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.createAnamneseFailure(error));
    }
  };
}

export function anamneseLoginReq(payload) {
  return async (dispatch) => {
    dispatch(slice.actions.anamneseLoginStart());
    try {
      const response = await axios.post(`${API_ENDPOINTS.auth.anamneseLogin}`, payload);
      dispatch(slice.actions.anamneseLoginSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.anamneseLoginFailure(error));
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
