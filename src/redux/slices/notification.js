import { createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS, jfAppApi } from 'src/utils/axios';

const initialState = {
  notifications: [],
  notificationsStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  readAt: null,
  readAtStatus: {
    loading: false,
    error: null,
    empty: false,
  },
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotificationsStart(state) {
      state.readAt = null;
      state.readAtStatus.loading = false;
      state.readAtStatus.error = null;
      state.readAtStatus.empty = false;

      state.notifications = [];
      state.notificationsStatus.loading = true;
      state.notificationsStatus.error = null;
      state.notificationsStatus.empty = false;
    },
    getNotificationsFailure(state, action) {
      state.notifications = [];
      state.notificationsStatus.loading = false;
      state.notificationsStatus.error = action.payload;
      state.notificationsStatus.empty = false;
    },
    getNotificationsSuccess(state, action) {
      const notifications = action.payload;

      state.notifications = notifications;
      state.notificationsStatus.loading = false;
      state.notificationsStatus.error = false;
      state.notificationsStatus.empty = !notifications.length || notifications.length === 0;
    },
    readAtStart(state) {
      state.readAt = null;
      state.readAtStatus.loading = true;
      state.readAtStatus.error = null;
      state.readAtStatus.empty = false;
    },
    readAteFailure(state, action) {
      state.readAt = null;
      state.readAtStatus.loading = false;
      state.readAtStatus.error = action.payload;
      state.readAtStatus.empty = false;
    },
    readAtSuccess(state, action) {
      state.readAt = action.payload;
      state.readAtStatus.loading = false;
      state.readAtStatus.error = null;
      state.readAtStatus.empty = false;
    },
  },
});

export default slice.reducer;

export function getNotificationsReq() {
  return async (dispatch) => {
    dispatch(slice.actions.getNotificationsStart());
    try {
      const response = await jfAppApi.get(`${API_ENDPOINTS.notifications.all}`);
      dispatch(slice.actions.getNotificationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getNotificationsFailure(error));
    }
  };
}

export function readAtReq(notificationId) {
  return async (dispatch) => {
    dispatch(slice.actions.readAtStart());
    try {
      const response = await jfAppApi.get(
        `${API_ENDPOINTS.notifications.readAt}/${notificationId}`,
      );
      dispatch(slice.actions.readAtSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.readAteFailure(error));
    }
  };
}
