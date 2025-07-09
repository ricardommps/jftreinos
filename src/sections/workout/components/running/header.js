import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PickersDay } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import { fDate } from 'src/utils/format-time';

const HighlightedDay = styled(PickersDay)(({ status }) => {
  let backgroundColor = 'transparent';
  let hoverColor = 'transparent';

  switch (true) {
    case status?.isCompleted:
      backgroundColor = '#77ED8B';
      hoverColor = 'darkgreen';
      break;
    case status?.isPast:
      backgroundColor = '#FF5630';
      hoverColor = 'darkred';
      break;
    case status?.isUnrealized:
      backgroundColor = '#FFAB00';
      hoverColor = 'darkred';
      break;
    case status?.isUpcoming:
      backgroundColor = '#006C9C';
      hoverColor = 'darkblue';
      break;
    case status?.isToday:
      backgroundColor = '#003768';
      hoverColor = 'darkblue';
      break;
    default:
      backgroundColor = 'transparent';
      hoverColor = 'transparent';
      break;
  }

  return {
    backgroundColor,
    color: 'white',
    '&:hover': {
      backgroundColor: hoverColor, // Hover effect for different statuses
    },
  };
});

export default function Header({ message, workoutsItems = [], setFilteredWorkouts, volume }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState();
  const [anchorElCalendar, setAnchorElCalendar] = useState(null);

  const openCalendar = Boolean(anchorElCalendar);
  const idCalendarPopover = openCalendar ? 'date-calendar-popover' : undefined;

  function toISOStringWithTimezone(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000; // Offset do fuso horário em milissegundos
    const localTime = new Date(date.getTime() - offsetMs); // Ajusta para o horário local

    const isoString = localTime.toISOString();
    return isoString.split('T')[0]; // Remove o 'Z' do final
  }

  function getFilteredWorkouts(workouts, day) {
    const currentDate = toISOStringWithTimezone(new Date(day));
    return workouts.filter((workout) => {
      const datePublished = toISOStringWithTimezone(new Date(workout.datePublished));
      return currentDate === datePublished;
    });
  }

  const getWorkoutStatus = (date) => {
    const workoutList = workoutsItems || [];
    if (workoutList.length === 0) return null;

    const workout = workoutList.find(
      (workout) => new Date(workout.datePublished).toDateString() === date.toDateString(),
    );

    if (!workout) return null;

    const isToday = date.toDateString() === today.toDateString();
    const isFinished = workout.finished;
    const isUnrealized = workout.unrealized;

    if (isFinished && !isUnrealized) {
      return { isCompleted: true };
    }

    if (isFinished && isUnrealized) {
      return { isUnrealized: true };
    }

    if (isToday) {
      return { isToday: true };
    }

    if (date < today) {
      return { isPast: true };
    }

    return { isUpcoming: true };
  };

  const handleOpenCalendar = (event) => {
    setAnchorElCalendar(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorElCalendar(null);
  };

  const handleSelectedDate = (newValue) => {
    setFilteredWorkouts(getFilteredWorkouts(workoutsItems, newValue));
    setSelectedDate(newValue);
    handleCloseCalendar(); // Fechar ao selecionar uma data
  };

  const isDateSelectable = (date) => {
    const workoutList = workoutsItems || [];
    if (workoutList.length === 0) return false;
    return workoutList.some((workout) => {
      const workoutDate = new Date(workout.datePublished); // Converte a string ISO em um objeto Date
      return (
        date.getDate() === workoutDate.getDate() &&
        date.getMonth() === workoutDate.getMonth() &&
        date.getFullYear() === workoutDate.getFullYear()
      );
    });
  };

  return (
    <>
      <Box component="main" sx={{ p: 3 }}>
        {message ? (
          <Typography variant="subtitle1">{message}</Typography>
        ) : (
          <>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography sx={{ flex: 1 }}>
                {fDate(new Date(selectedDate || new Date()), "dd 'de' MMMM, yyyy")}
              </Typography>
              <IconButton
                onClick={handleOpenCalendar}
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                <CalendarMonthIcon />
              </IconButton>
            </Stack>
            <Stack alignItems="center" sx={{ mt: 3 }} spacing={2}>
              <Button
                color="inherit"
                variant="contained"
                sx={{ mb: 1, minWidth: '45%', marginLeft: '8px' }}
                onClick={volume.onTrue}
              >
                Volume
              </Button>
            </Stack>
          </>
        )}
      </Box>
      <Popover
        id={idCalendarPopover}
        open={openCalendar}
        anchorEl={anchorElCalendar}
        onClose={handleCloseCalendar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, position: 'relative' }}>
          {/* Botão de Fechar */}
          <IconButton
            aria-label="close"
            size="small"
            onClick={handleCloseCalendar}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Iconify icon="eva:close-fill" />
          </IconButton>

          {/* Calendário */}
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => {
              handleSelectedDate(newValue);
            }}
            slots={{
              day: (props) => {
                const { day, ...rest } = props;
                const status = getWorkoutStatus(day);

                return <HighlightedDay {...rest} day={day} status={status} />;
              },
            }}
            shouldDisableDate={(date) => !isDateSelectable(date)}
          />
        </Box>
      </Popover>
    </>
  );
}
