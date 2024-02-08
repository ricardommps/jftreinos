import { createSlice } from '@reduxjs/toolkit';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

const eventsFormated = (dataEvents) => {
  const data = Object.assign([], dataEvents);
  const newData = [];
  for (var key in data) {
    newData.push({
      id: data[key].id.toString(),
      allDay: true,
      color: '#00B8D9',
      description: data[key].description,
      start: data[key].datePublished,
      end: data[key].datePublished,
      trainingDateOther: data[key].trainingDateOther,
      title: data[key].name,
      subtitle: data[key].subtitle,
      videos: data[key].videos,
    });
  }
  return newData;
};

const initialState = {
  events: [],
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // GET EVENTS
    getEventsSuccess(state, action) {
      state.events = action.payload;
    },
  },
});

export default slice.reducer;

export function getEvents(programId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.home.trainingsByProgramId}/${programId}`);
      const newResponse = eventsFormated(response.data);
      dispatch(slice.actions.getEventsSuccess(newResponse));
    } catch (error) {
      console.error(error);
    }
  };
}
