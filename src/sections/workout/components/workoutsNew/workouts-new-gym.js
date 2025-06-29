import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import { useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import { fDate } from 'src/utils/format-time';

import WorkoutNewItem from './workout-new-item';

export default function WorkoutsNewGym({ workouts, program, loading }) {
  console.log('---workouts---', workouts);
  const [anchorElCalendar, setAnchorElCalendar] = useState(null);
  const openCalendar = Boolean(anchorElCalendar);
  const idCalendarPopover = openCalendar ? 'date-calendar-popover' : undefined;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const nowCalendar = dayjs();
  const startOfMonthCalendar = nowCalendar.startOf('month');
  const endOfMonthCalendar = nowCalendar.endOf('month');

  const handleOpenCalendar = (event) => {
    setAnchorElCalendar(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorElCalendar(null);
  };

  const historiesThisMonth = workouts
    .flatMap((workout) => workout.history || [])
    .filter((item) => {
      if (!item.executionDay) return false;
      const execDate = new Date(item.executionDay);
      return execDate >= startOfMonth && execDate <= endOfMonth;
    });

  const executionDates = historiesThisMonth?.map((item) =>
    dayjs(item.executionDay).startOf('day').format('YYYY-MM-DD'),
  );

  const hasWorkoutOnDate = (date) => {
    if (!executionDates || executionDates.length === 0) return false;
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    return executionDates.includes(dateStr);
  };

  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const isWorkoutDay = hasWorkoutOnDate(day);

    return (
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={{
          ...(isWorkoutDay && {
            backgroundColor: '#4caf50', // Verde para dias com treino
            color: 'white',
            '&:hover': {
              backgroundColor: '#388e3c',
            },
            '&.Mui-selected': {
              backgroundColor: '#2e7d32',
            },
          }),
        }}
      />
    );
  };

  return (
    <>
      {!loading && program && (
        <>
          <Stack textAlign={'center'} spacing={2} sx={{ bgcolor: 'background.neutral' }} p={2}>
            <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
              <Typography variant="h5">{program?.name}</Typography>
            </Stack>
            {program.startDate && program.endDate && (
              <Typography variant="subtitle2">{`${fDate(program.startDate, 'dd/MM/yyyy')} - ${fDate(
                program.endDate,
                'dd/MM/yyyy',
              )}`}</Typography>
            )}
          </Stack>

          <Stack direction={'row'} alignItems={'center'} px={3} justifyContent={'center'} py={2}>
            <Button
              size="large"
              color="info"
              variant="outlined"
              endIcon={<CalendarMonthIcon />}
              onClick={handleOpenCalendar}
            >
              Treinos finalizados
            </Button>
          </Stack>

          {program?.additionalInformation && (
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3, m: 3, mt: 0 }}>
              <Stack direction="column" alignItems="center" width={'100%'}>
                <Typography variant="subtitle1" textAlign={'center'}>
                  Informações adicionais
                </Typography>
                <Stack direction="column" alignItems="left" sx={{ mt: 2, mb: 1 }} width={'100%'}>
                  <Typography variant="subtitle" textAlign={'left'} mt={3}>
                    {program?.additionalInformation}
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          )}

          {program?.message && (
            <Box component="main" sx={{ p: 3 }}>
              <Typography variant="subtitle1">{program.message}</Typography>
            </Box>
          )}

          <Stack sx={{ p: 2 }}>
            {workouts && workouts.length > 0
              ? workouts.map((workout) => <WorkoutNewItem workout={workout} key={workout.id} />)
              : !program?.message && (
                  <Stack alignItems={'center'}>
                    <Typography variant="subtitle1">Nenhum treino</Typography>
                  </Stack>
                )}
          </Stack>
        </>
      )}

      {/* Calendar Popover */}
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

          {/* Calendário com mês atual apenas */}
          <DateCalendar
            minDate={startOfMonthCalendar}
            maxDate={endOfMonthCalendar}
            shouldDisableDate={(date) =>
              dayjs(date).isBefore(startOfMonthCalendar, 'day') ||
              dayjs(date).isAfter(endOfMonthCalendar, 'day')
            }
            views={['day']} // impede visualização de ano/mês
            slotProps={{
              day: {
                sx: {
                  // Estilo base para todos os dias
                },
              },
            }}
            slots={{
              day: CustomDay,
            }}
            sx={{
              '& .MuiPickersCalendarHeader-switchViewButton': {
                display: 'none',
              },
              '& .MuiPickersArrowSwitcher-root': {
                display: 'none',
              },
            }}
          />
        </Box>
      </Popover>
    </>
  );
}
