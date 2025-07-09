'use client';

import { Box, Button, Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import LoadingProgress from 'src/components/loading-progress';
import useProgram from 'src/hooks/use-program';
import useWorkout from 'src/hooks/use-workout';
import useWorkouts from 'src/hooks/use-workouts';
import { useRouter } from 'src/routes/hook';

import WorkoutsGym from '../components/workouts/workouts-gym';
import WorkoutsNewGym from '../components/workoutsNew/workouts-new-gym';

export default function WorkoutGymView() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { onListWorkoutsByProgramId, workouts } = useWorkout();
  const { onGetWorkouts, workoutsNew } = useWorkouts();
  const { onGetProgram, program } = useProgram();

  const [loading, setLoading] = useState(false);

  const handleGoBack = () => router.back();

  const initialize = useCallback(async () => {
    try {
      setLoading(true);
      await onListWorkoutsByProgramId(id, 2);
      await onGetWorkouts(id, 2);
      await onGetProgram(id);
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
      {/* {workouts?.program && <WorkoutsGym workouts={workouts} loading={loading} />} */}
      {workoutsNew && workoutsNew.length > 0 && program ? (
        <WorkoutsNewGym workouts={workoutsNew} program={program} loading={loading} />
      ) : (
        <>{workouts?.program && <WorkoutsGym workouts={workouts} loading={loading} />}</>
      )}
    </Box>
  );
}
