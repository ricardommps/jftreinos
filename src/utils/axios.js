import axios from 'axios';
// config
import { HOST_API_JF } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_JF });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong'),
);

export default axiosInstance;

export const API_ENDPOINTS = {
  auth: {
    me: '/api/v2/user/customer/me',
    login: '/api/v2/auth/customer/login',
  },
  home: {
    programs: '/api/v2/program/myPrograms',
    programDetail: '/api/v2/program/myProgram',
    finishedtraining: '/api/v2/finishedtraining',
    trainingsByProgramId: '/api/v2/training/list',
    finishedList: '/api/v2/finishedtraining/listByUser',
    metrics: '/api/v2/metrics/myMetrics',
    viewedFeedback: '/api/v2/trainingfeedback/viewed',
    viewPdf: '/api/v2/program/viewPdf',
  },
  training: '/api/v2/training/trainingById',
  user: {
    changePassword: '/api/v2/customer/resetPassword',
  },
  myData: '/api/v2/customer/myData',
  upload: '/api/v2/customer/avatar',
  rating: {
    root: '/api/v2/rating',
  },
};
