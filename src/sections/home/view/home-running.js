import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PickersDay } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import LoadingProgress from 'src/components/loading-progress';
import ProgramInfo from 'src/sections/programs/program-info';
import WorkoutItem from 'src/sections/workout/workout-item';
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

export default function HomeRunning({ workouts, workoutsStatus, program, loading }) {
  const today = new Date();

  const [anchorElProgramDetais, setAnchorElProgramDetais] = useState(null);
  const [anchorElCalendar, setAnchorElCalendar] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [filteredWorkouts, setFilteredWorkouts] = useState(null);

  const openProgramDetais = Boolean(anchorElProgramDetais);
  const idProgramDetaisPopover = openProgramDetais ? 'program-details-popover' : undefined;

  const openCalendar = Boolean(anchorElCalendar);
  const idCalendarPopover = openCalendar ? 'date-calendar-popover' : undefined;

  function getFilteredWorkouts(workouts, day) {
    const daySplit = new Date(day).toISOString().split('T')[0];
    return workouts.filter((workout) => {
      const workoutDate = new Date(workout.datePublished).toISOString().split('T')[0];
      return workoutDate === daySplit;
    });
  }

  const isDateSelectable = (date) => {
    const workoutList = workouts || [];
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

  const getWorkoutStatus = (date) => {
    const workoutList = workouts || [];
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

  const handleOpenProgramDetais = (event) => {
    setAnchorElProgramDetais(event.currentTarget);
  };

  const handleCloseProgramDetais = () => {
    setAnchorElProgramDetais(null);
  };

  const handleOpenCalendar = (event) => {
    setAnchorElCalendar(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorElCalendar(null);
  };

  const handleSelectedDate = (newValue) => {
    setFilteredWorkouts(getFilteredWorkouts(workouts, newValue));
    setSelectedDate(newValue);
    handleCloseCalendar(); // Fechar ao selecionar uma data
  };

  useEffect(() => {
    if (workouts?.length > 0) {
      setFilteredWorkouts(getFilteredWorkouts(workouts, today));
    } else {
      setFilteredWorkouts([]); // Define como array vazio se não houver workouts
    }
  }, [workouts]);
  return (
    <>
      <Stack textAlign={'center'} spacing={2} sx={{ bgcolor: 'background.neutral' }} p={2}>
        <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
          <Typography variant="h5">{program?.name}</Typography>
          <IconButton
            aria-label="info"
            size="small"
            sx={{ color: (theme) => theme.palette.text.primary }}
            onClick={handleOpenProgramDetais}
          >
            <InfoIcon />
          </IconButton>
        </Stack>
        {program.startDate && program.endDate && (
          <Typography variant="subtitle2">{`${fDate(program.startDate, 'dd/MM/yyyy')} - ${fDate(
            program.endDate,
            'dd/MM/yyyy',
          )}`}</Typography>
        )}
      </Stack>
      <Box sx={{ mx: 3 }} pt={3} pb={'100px'}>
        {loading && <LoadingProgress />}
        {(!workoutsStatus.loading || !loading) && !workoutsStatus.empty && workouts && (
          <>
            {workouts?.message ? (
              <Typography variant="subtitle1">{workouts.message}</Typography>
            ) : (
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
            )}
          </>
        )}
        <Box sx={{ pt: 2 }}>
          {filteredWorkouts && filteredWorkouts.length > 0 ? (
            <>
              {filteredWorkouts.map((workout) => (
                <WorkoutItem workout={workout} key={workout.id} hideHistory={true} />
              ))}
            </>
          ) : (
            <>
              {!workouts?.message && (
                <Stack alignItems={'center'}>
                  <Typography variant="subtitle1">Nenhum treino</Typography>
                </Stack>
              )}
            </>
          )}
        </Box>
      </Box>
      <Popover
        id={idProgramDetaisPopover}
        open={openProgramDetais}
        anchorEl={anchorElProgramDetais}
        onClose={handleCloseProgramDetais}
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
            onClick={handleCloseProgramDetais}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Iconify icon="eva:close-fill" />
          </IconButton>
          <Box pt={3}>
            <ProgramInfo program={program} />
          </Box>
        </Box>
      </Popover>
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
            value={selectedDate || null}
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
