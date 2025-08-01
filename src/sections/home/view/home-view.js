'use client';

// @mui
import { Backdrop, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import LoadingProgress from 'src/components/loading-progress';
import useAnamnese from 'src/hooks/use-anamnese';
import useHome from 'src/hooks/use-home';
import useRating from 'src/hooks/use-rating';
import useWorkout from 'src/hooks/use-workout';

import HomeOld from './home-old';
import HomeSelectProgram from './home-select-program';
// ----------------------------------------------------------------------

export default function HomeView() {
  const { user, refreshMe } = useAuthContext();
  const { onClearAnamneseState } = useAnamnese();
  const { onClearStateWorkout } = useWorkout();
  const { onListPrograms, programs } = useHome();
  const { rating, ratingStatus } = useRating();

  const [loading, setLoading] = useState(false);

  const initialize = useCallback(async () => {
    try {
      setLoading(true);
      await onListPrograms();
      await onClearStateWorkout();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      initialize();
    }
  }, [user]);

  useEffect(() => {
    refreshMe();
    onClearAnamneseState();
  }, []);

  useEffect(() => {
    if (rating) {
      refreshMe();
    }
  }, [rating]);

  const hasTrainings = programs?.some((item) => item.trainings.length > 0);
  return (
    <Box
      sx={{
        overflow: 'hidden', // Remove a rolagem
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        pb: 10,
      }}
    >
      {ratingStatus?.loading && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Stack textAlign={'center'}>
        <Typography variant="h5">Olá, {user?.name}</Typography>
      </Stack>
      {loading && <LoadingProgress />}
      {programs && hasTrainings ? (
        <HomeOld programs={programs} />
      ) : (
        <>
          <HomeSelectProgram programs={programs} />
        </>
      )}
    </Box>
  );
}
