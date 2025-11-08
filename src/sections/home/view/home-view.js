'use client';

import { Backdrop, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import LoadingProgress from 'src/components/loading-progress';
import NewAppNotification from 'src/components/new-app-notification/new-app-notification';
import useAnamnese from 'src/hooks/use-anamnese';
import useHome from 'src/hooks/use-home';
import useRating from 'src/hooks/use-rating';
import useWorkout from 'src/hooks/use-workout';

import HomeOld from './home-old';
import HomeSelectProgram from './home-select-program';

export default function HomeView() {
  const { user, refreshMe } = useAuthContext();
  const { onClearAnamneseState } = useAnamnese();
  const { onClearStateWorkout } = useWorkout();
  const { onListPrograms, programs } = useHome();
  const { rating, ratingStatus } = useRating();

  const [loading, setLoading] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

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
  }, [onListPrograms, onClearStateWorkout]);

  useEffect(() => {
    if (user) {
      initialize();
    }
  }, [user, initialize]);

  useEffect(() => {
    refreshMe();
    onClearAnamneseState();
  }, []);

  useEffect(() => {
    if (rating) {
      refreshMe();
    }
  }, [rating]);

  useEffect(() => {
    // Detecta se é iOS
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        setIsIOS(true);
        setOpenNotification(true);
      }
    }
  }, []);

  const hasTrainings = programs && programs.some((item) => item.trainings.length > 0);

  return (
    <>
      <Box
        sx={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          pb: 10,
        }}
      >
        {ratingStatus && ratingStatus.loading && (
          <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
            <CircularProgress color="primary" />
          </Backdrop>
        )}

        <Stack textAlign="center">
          <Typography variant="h5">Olá, {user && user.name}</Typography>
        </Stack>

        {loading && <LoadingProgress />}

        {programs && hasTrainings ? (
          <HomeOld programs={programs} />
        ) : (
          !openNotification && <HomeSelectProgram programs={programs} />
        )}
      </Box>

      {/* Renderiza notificação apenas em iOS */}
      {isIOS && openNotification && (
        <NewAppNotification open={openNotification} onClose={() => setOpenNotification(false)} />
      )}
    </>
  );
}
