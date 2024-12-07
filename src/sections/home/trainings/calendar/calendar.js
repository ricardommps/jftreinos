import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import { getEvents } from 'src/redux/slices/calendar';
import { useDispatch } from 'src/redux/store';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { fDateCalender } from 'src/utils/format-time';
import { getModuleName } from 'src/utils/modules';

import FinishTraining from '../finish-training';
import TypeTraining from '../type-training';
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
  const router = useRouter();
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
    onCloseForm,
    onOpenFinishTraining,
    onCloseFinishTraining,
    openTypeTraining,
    onCloseTypeTraining,
    onOpenTypeTraining,
    typeTrainingSelected,
    setTypeTrainingSelected,
  } = useCalendar();

  const [unrealizedTraining, setUnrealizedTraining] = useState(false);

  const renderEventContent = (eventInfo) => {
    return (
      <Stack
        display={'block'}
        sx={{
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.5)}`,
          width: '100%',
          padding: '0px 10px',
        }}
      >
        <Stack>
          <Typography variant="subtitle1">{getModuleName(eventInfo.event.title)}</Typography>
          <Typography variant="caption">{eventInfo.event.extendedProps.subtitle}</Typography>
        </Stack>

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

  const handleOpenFinishTraining = () => {
    if (type === 2) {
      onOpenFinishTraining();
    } else {
      onOpenTypeTraining();
    }
  };

  const handleClickEvent = useCallback(
    (arg) => {
      router.push(paths.dashboard.training.root(arg.event.id));
    },
    [router],
  );

  const handleClickExtra = useCallback(
    (id) => {
      router.push(paths.dashboard.training.root(id));
    },
    [router],
  );

  useEffect(() => {
    if (unrealizedTraining) {
      onOpenFinishTraining();
    }
  }, [unrealizedTraining]);

  const extraTrainings = events.filter((item) => !item.start);
  return (
    <>
      {extraTrainings && extraTrainings.length > 0 && (
        <Box>
          <Typography variant="h6" align="center">
            Treinos extras
          </Typography>
          <Card>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {extraTrainings.map((training) => (
                <ListItem
                  key={training.id}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleClickExtra(training.id)}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={getModuleName(training.title)}
                    secondary={training.subtitle}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Box>
      )}
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
            eventClick={handleClickEvent}
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
            handleOpenFinishedTraining={handleOpenFinishTraining}
            type={type}
            setUnrealizedTraining={setUnrealizedTraining}
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
          unrealizedTraining={unrealizedTraining}
          typeTrainingSelected={typeTrainingSelected}
        />
      )}
      {openTypeTraining && (
        <TypeTraining
          open={openTypeTraining}
          onClose={onCloseTypeTraining}
          typeTrainingSelected={typeTrainingSelected}
          setTypeTrainingSelected={setTypeTrainingSelected}
          onOpenFinishTraining={onOpenFinishTraining}
        />
      )}
    </>
  );
}
