'use client';

import { Box, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PickersDay } from '@mui/x-date-pickers';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import LoadingProgress from 'src/components/loading-progress';
import { useBoolean } from 'src/hooks/use-boolean';
import useFinished from 'src/hooks/use-finished';
import useWorkout from 'src/hooks/use-workout';
import useWorkouts from 'src/hooks/use-workouts';
import { useRouter } from 'src/routes/hook';

import WorkoutsNewRunning from '../components/workouts/workout-new-running';
import WorkoutsRunning from '../components/workouts/workout-running';

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

  const volume = useBoolean();

  const { onListWorkoutsByProgramId, workouts } = useWorkout();
  const { onGetWorkouts, workoutsNew } = useWorkouts();
  const { onClearVolumeState } = useFinished();

  const [loading, setLoading] = useState(false);

  const handleGoBack = () => router.back();

  const initialize = useCallback(async () => {
    try {
      setLoading(true);

      // Primeira fase: carregar workoutsNew e limpar volume state
      await onGetWorkouts(id, 1);
      await onClearVolumeState();
      await onListWorkoutsByProgramId(id, 1);
      // Aguardar um pouco para o estado ser atualizado
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [id, onGetWorkouts, onClearVolumeState, onListWorkoutsByProgramId]);

  useEffect(() => {
    if (id) {
      initialize();
    }
  }, [id, initialize]);

  function hasWorkoutWithId(itens) {
    if (!Array.isArray(itens)) return false;

    return itens.some((workoutItem) => workoutItem?.id);
  }

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
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          {hasWorkoutWithId(workoutsNew) ? (
            <>
              <WorkoutsNewRunning workouts={workoutsNew} loading={loading} programId={id} />
            </>
          ) : (
            <>
              <WorkoutsRunning workouts={workouts} loading={loading} />
            </>
          )}
        </>
      )}
    </Box>
  );
}
