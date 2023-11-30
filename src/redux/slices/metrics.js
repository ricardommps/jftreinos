import { createSlice } from '@reduxjs/toolkit';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

const initialState = {
  metrics: null,
  metricsStatus: {
    loading: false,
    error: null,
    empty: false,
  },
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    getMetricsStart(state) {
      state.metrics = null;
      state.metricsStatus.loading = true;
      state.metricsStatus.error = null;
      state.metricsStatus.empty = false;
    },
    getMetricsFailure(state, action) {
      state.metrics = null;
      state.metricsStatus.loading = false;
      state.metricsStatus.error = action.payload;
      state.metricsStatus.empty = false;
    },
    getMetricsSuccess(state, action) {
      const metrics = action.payload;

      state.metrics = metrics;
      state.metricsStatus.loading = false;
      state.metricsStatus.error = null;
      state.metricsStatus.empty = !metrics.length || metrics.length === 0;
    },
  },
});

export default slice.reducer;

export function getAllMetrics() {
  return async (dispatch) => {
    dispatch(slice.actions.getMetricsStart());
    try {
      const response = await axios.get(`${API_ENDPOINTS.home.metrics}`);
      dispatch(slice.actions.getMetricsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getMetricsFailure(error));
    }
  };
}
