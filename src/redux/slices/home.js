import { createSlice } from '@reduxjs/toolkit';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
const initialState = {
  profile: null,
  profileStatus: {
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
});

export default slice.reducer;
