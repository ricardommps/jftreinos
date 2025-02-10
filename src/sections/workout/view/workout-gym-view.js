'use client';

import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import LoadingProgress from 'src/components/loading-progress';
import useWorkout from 'src/hooks/use-workout';
import { useRouter } from 'src/routes/hook';
import { fDate } from 'src/utils/format-time';

import WorkoutItem from '../workout-item';

export default function WorkoutGymView() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { onListWorkoutsByProgramId, workouts } = useWorkout();

  const [loading, setLoading] = useState(false);

  const handleGoBack = () => router.back();

  const initialize = useCallback(async () => {
    try {
      setLoading(true);

      await onListWorkoutsByProgramId(id, 2);
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
      {!loading && workouts?.program && (
        <>
          <Stack textAlign={'center'} spacing={2} sx={{ bgcolor: 'background.neutral' }} p={2}>
            <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
              <Typography variant="h5">{workouts?.program?.name}</Typography>
            </Stack>
            {workouts?.program.startDate && workouts?.program.endDate && (
              <Typography variant="subtitle2">{`${fDate(
                workouts?.program.startDate,
                'dd/MM/yyyy',
              )} - ${fDate(workouts?.program.endDate, 'dd/MM/yyyy')}`}</Typography>
            )}
          </Stack>

          {workouts?.program?.additionalInformation && (
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3, m: 3 }}>
              <Stack direction="column" alignItems="center" width={'100%'}>
                <Typography variant="subtitle1" textAlign={'center'}>
                  Informações adicionais
                </Typography>
                <Stack direction="column" alignItems="left" sx={{ mt: 2, mb: 1 }} width={'100%'}>
                  <Typography variant="subtitle" textAlign={'left'} mt={3}>
                    {workouts?.program?.additionalInformation}
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          )}

          {workouts?.message && (
            <Box component="main" sx={{ p: 3 }}>
              {workouts?.message && <Typography variant="subtitle1">{workouts.message}</Typography>}
            </Box>
          )}

          <Stack sx={{ p: 2 }}>
            {workouts?.items && workouts?.items.length > 0 ? (
              <>
                {workouts?.items.map((workout) => (
                  <WorkoutItem workout={workout} key={workout.id} />
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
          </Stack>
        </>
      )}
    </Box>
  );
}
