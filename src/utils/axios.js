import axios from 'axios';
// config
import { HOST_API_JF } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_JF });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong'),
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      console.error(error.message);
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  },
);

export default axiosInstance;

export const API_ENDPOINTS = {
  auth: {
    me: '/api/v2/user/customer/me',
    login: '/api/v2/auth/customer/login',
    anamneseLogin: '/api/v2/auth/customer/anamnese/login',
  },
  anamnese: {
    create: 'api/v2/anamnese',
    createRegisteredUser: 'api/v2/anamnese/registeredUser',
  },
  notifications: {
    all: 'api/v2/notification/all',
    readAt: 'api/v2/notification/readAt',
  },
  customer: {
    checkEmail: '/api/v2/customer/checkEmail',
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
  workoutLoad: '/api/v2/workout-load',
  workout: {
    root: '/api/v2/workout',
  },
  finished: {
    root: '/api/v2/finished',
  },
  log: {
    root: '/api/v2/log',
  },
  invoice: {
    root: '/api/v2/invoice',
    my: '/api/v2/invoice/my',
    totalPaid: '/api/v2/invoice/total-paid',
    invoices: '/api/v2/invoice/listAll',
  },
};
