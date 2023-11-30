import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import { useCallback, useEffect } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import { getEvents } from 'src/redux/slices/calendar';
import { useDispatch } from 'src/redux/store';
import { fDateCalender } from 'src/utils/format-time';
import { getModuleName } from 'src/utils/modules';

import FinishTraining from '../ finish-training';
import CalendarDetails from './calendar-details';
import CalendarToolbar from './calendar-toolbar';
import { useCalendar } from './hooks';
import { StyledCalendar } from './styles';

function useInitial(id) {
  const dispatch = useDispatch();

  const getEventsCallback = useCallback(
    (id) => {
      dispatch(getEvents(id));
    },
    [dispatch],
  );

  useEffect(() => {
    getEventsCallback(id);
  }, [getEventsCallback]);

  return null;
}

export default function Calendar({ id, type }) {
  const smUp = useResponsive('up', 'sm');
  const theme = useTheme();
  useInitial(id);
  const {
    calendarRef,
    events,
    view,
    date,
    currentEventId,
    openForm,
    openFinishTraining,
    initialEvent,
    onDateNext,
    onDatePrev,
    onDateToday,
    onSelectRange,
    onClickEvent,
    onCloseForm,
    onOpenFinishTraining,
    onCloseFinishTraining,
  } = useCalendar();

  const renderEventContent = (eventInfo) => {
    return (
      <Stack
        display={'block'}
        sx={{
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.5)}`,
          width: 'fit-content',
          padding: '0px 10px',
        }}
      >
        <b>{getModuleName(eventInfo.event.title)}</b>
        <br />
        {eventInfo.event.extendedProps.trainingDateOther && (
          <>
            <i>Dia alternativo</i>
            <br />
            <i>{fDateCalender(eventInfo.event.extendedProps.trainingDateOther)}</i>
          </>
        )}
      </Stack>
    );
  };

  return (
    <>
      <Card>
        <StyledCalendar>
          <CalendarToolbar
            date={date}
            onNextDate={onDateNext}
            onPrevDate={onDatePrev}
            onToday={onDateToday}
          />
          <FullCalendar
            weekends
            editable
            droppable
            selectable
            rerenderDelay={10}
            allDayMaintainDuration
            eventResizableFromStart
            ref={calendarRef}
            initialDate={date}
            initialView={view}
            dayMaxEventRows={3}
            eventDisplay="block"
            events={events}
            headerToolbar={false}
            initialEvents={events}
            select={onSelectRange}
            eventClick={onClickEvent}
            height={smUp ? 720 : 'auto'}
            plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
            locale={ptBrLocale}
            eventContent={renderEventContent}
          />
        </StyledCalendar>
      </Card>
      {openForm && (
        <Dialog
          fullScreen
          open={openForm}
          transitionDuration={{
            enter: theme.transitions.duration.shortest,
            exit: theme.transitions.duration.shortest - 80,
          }}
        >
          <CalendarDetails
            event={initialEvent()}
            onClose={onCloseForm}
            handleOpenFinishedTraining={onOpenFinishTraining}
          />
        </Dialog>
      )}
      {openFinishTraining && (
        <FinishTraining
          open={openFinishTraining}
          onClose={onCloseFinishTraining}
          trainingId={currentEventId}
          event={initialEvent()}
          type={type}
        />
      )}
    </>
  );
}
