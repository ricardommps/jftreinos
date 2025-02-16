'use client';

// @mui
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from 'react';
import RatingDialog from 'src/components/rating-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import useWorkout from 'src/hooks/use-workout';

import Footer from './footer';
import HomeGym from './home-gym';
import HomeRunning from './home-running';
// ----------------------------------------------------------------------

export default function HomeSingleProgramView({ program }) {
  const { id, type } = program;
  const ratingOpen = useBoolean();
  const { onListWorkouts, workouts, workoutsStatus } = useWorkout();

  const [loading, setLoading] = useState(false);

  const initialize = useCallback(async () => {
    try {
      setLoading(true);
      await onListWorkouts(id, type);
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
    <Box pt={3}>
      {type === 2 ? (
        <HomeGym
          workouts={workouts}
          workoutsStatus={workoutsStatus}
          program={program}
          loading={loading}
        />
      ) : (
        <HomeRunning
          workouts={workouts}
          workoutsStatus={workoutsStatus}
          program={program}
          loading={loading}
        />
      )}

      <Footer />

      {ratingOpen.value && <RatingDialog open={ratingOpen.value} onClose={ratingOpen.onFalse} />}
    </Box>
  );
}
