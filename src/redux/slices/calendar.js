import { createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS, jfAppApi } from 'src/utils/axios';

const eventsFormated = (dataEvents) => {
  const newData = dataEvents.map((event) => ({
    id: event.id.toString(),
    allDay: true,
    color: '#00B8D9',
    description: event.description || '', // Garantindo que tenha uma string
    start: event.datePublished,
    end: event.datePublished,
    trainingDateOther: event.trainingDateOther || null,
    title: event.name || '',
    subtitle: event.subtitle || '',
    videos: event.videos || [],
  }));

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
      const response = await jfAppApi.get(
        `${API_ENDPOINTS.home.trainingsByProgramId}/${programId}`,
      );
      const newResponse = eventsFormated(response.data);
      dispatch(slice.actions.getEventsSuccess(newResponse));
    } catch (error) {
      console.error(error);
    }
  };
}
