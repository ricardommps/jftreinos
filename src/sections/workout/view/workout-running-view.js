'use client';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Button, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import { PickersDay } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import LoadingProgress from 'src/components/loading-progress';
import useWorkout from 'src/hooks/use-workout';
import { useRouter } from 'src/routes/hook';
import ProgramInfo from 'src/sections/programs/program-info';
import { fDate } from 'src/utils/format-time';

import WorkoutItem from '../workout-item';

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

export default function WorkoutRunningView() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { onListWorkoutsByProgramId, workouts } = useWorkout();

  const [anchorElCalendar, setAnchorElCalendar] = useState(null);
  const [anchorElProgramDetais, setAnchorElProgramDetais] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(false);
  const [filteredWorkouts, setFilteredWorkouts] = useState(null);

  const openCalendar = Boolean(anchorElCalendar);
  const idCalendarPopover = openCalendar ? 'date-calendar-popover' : undefined;

  const openProgramDetais = Boolean(anchorElProgramDetais);
  const idProgramDetaisPopover = openProgramDetais ? 'program-details-popover' : undefined;

  const today = new Date();

  function getFilteredWorkouts(workouts, day) {
    const currentDate = new Date(day);
    currentDate.setUTCHours(0, 1, 0, 0);
    return workouts.filter((workout) => {
      const datePublished = new Date(workout.datePublished);
      datePublished.setUTCHours(0, 1, 0, 0);
      return currentDate.toISOString() === datePublished.toISOString();
    });
  }

  const handleGoBack = () => router.back();

  const isDateSelectable = (date) => {
    const workoutList = workouts?.items || [];
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
    const workoutList = workouts?.items || [];
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

  const handleOpenProgramDetais = (event) => {
    setAnchorElProgramDetais(event.currentTarget);
  };

  const handleCloseProgramDetais = () => {
    setAnchorElProgramDetais(null);
  };

  const handleSelectedDate = (newValue) => {
    setFilteredWorkouts(getFilteredWorkouts(workouts.items, newValue));
    setSelectedDate(newValue);
    handleCloseCalendar(); // Fechar ao selecionar uma data
  };

  const initialize = useCallback(async () => {
    try {
      setLoading(true);
      await onListWorkoutsByProgramId(id, 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      initialize();
    }
  }, [id, initialize]);

  useEffect(() => {
    if (workouts?.items?.length > 0) {
      setFilteredWorkouts(getFilteredWorkouts(workouts.items, today));
    } else {
      setFilteredWorkouts([]); // Define como array vazio se não houver workouts
    }
  }, [workouts]);
  return (
    <Box>
      <Stack spacing={1.5} direction="row" pl={2}>
        <Button
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          onClick={handleGoBack}
        >
          Voltar
        </Button>
      </Stack>
      {loading && <LoadingProgress />}
      {!loading && workouts?.program && (
        <>
          <Stack textAlign={'center'} spacing={2} sx={{ bgcolor: 'background.neutral' }} p={2}>
            <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
              <Typography variant="h5">{workouts?.program?.name}</Typography>
              <IconButton
                aria-label="info"
                size="small"
                sx={{ color: (theme) => theme.palette.text.primary }}
                onClick={handleOpenProgramDetais}
              >
                <InfoIcon />
              </IconButton>
            </Stack>
            {workouts?.program.startDate && workouts?.program.endDate && (
              <Typography variant="subtitle2">{`${fDate(
                workouts?.program.startDate,
                'dd/MM/yyyy',
              )} - ${fDate(workouts?.program.endDate, 'dd/MM/yyyy')}`}</Typography>
            )}
          </Stack>
          <Box component="main" sx={{ p: 3 }}>
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
                <ProgramInfo program={workouts?.program} />
              </Box>
            </Box>
          </Popover>

          <Box sx={{ p: 2 }}>
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
        </>
      )}
    </Box>
  );
}
