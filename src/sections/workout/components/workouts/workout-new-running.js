import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import useProgram from 'src/hooks/use-program';

import AdditionalInfo from '../running/additional-info';
import Header from '../running/header';
import ProgramDetails from '../running/program-details';
import TrainingVolume from '../trainingVolume/trainingVolume';
import WorkoutNewItem from '../workoutsNew/workout-new-item';

export default function WorkoutsNewRunning({ workouts, programId }) {
  const volume = useBoolean();
  const { onGetProgram, program } = useProgram();

  const [loadingProgram, setLoadingProgram] = useState(false);
  const [filteredWorkouts, setFilteredWorkouts] = useState(null);

  function toISOStringWithTimezone(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const localTime = new Date(date.getTime() - offsetMs);
    return localTime.toISOString().split('T')[0];
  }

  function getFilteredWorkoutStart(workouts) {
    const currentDate = toISOStringWithTimezone(new Date());
    return workouts.filter((workout) => {
      const datePublished = toISOStringWithTimezone(new Date(workout.datePublished));
      return currentDate === datePublished;
    });
  }

  useEffect(() => {
    if (workouts?.length > 0) {
      setFilteredWorkouts(getFilteredWorkoutStart(workouts));
    } else {
      setFilteredWorkouts([]);
    }
  }, [workouts]);

  const initialize = useCallback(async () => {
    try {
      setLoadingProgram(true);
      await onGetProgram(programId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProgram(false);
    }
  }, [programId, onGetProgram]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      {workouts?.length > 0 ? (
        <Box>
          {program && (
            <>
              <ProgramDetails program={program} />
            </>
          )}
          {program?.additionalInformation && (
            <AdditionalInfo additionalInformation={program?.additionalInformation} />
          )}
          <Header
            message={workouts?.message}
            workoutsItems={workouts}
            setFilteredWorkouts={setFilteredWorkouts}
            volume={volume}
          />
          {volume.value && (
            <TrainingVolume open={volume.value} onClose={volume.onFalse} programId={program.id} />
          )}
          <Box sx={{ p: 2 }}>
            {filteredWorkouts && filteredWorkouts.length > 0 ? (
              <>
                {filteredWorkouts && filteredWorkouts.length > 0
                  ? filteredWorkouts.map((workout) => (
                      <WorkoutNewItem workout={workout} key={workout.id} />
                    ))
                  : !program?.message && (
                      <Stack alignItems={'center'}>
                        <Typography variant="subtitle1">Nenhum treino</Typography>
                      </Stack>
                    )}
              </>
            ) : (
              <>
                {!workouts?.message && (
                  <>
                    <Stack alignItems={'center'}>
                      <Typography variant="subtitle1">Nenhum treino</Typography>
                    </Stack>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      ) : (
        <Stack alignItems={'center'}>
          <Typography variant="subtitle1">Nenhum treino</Typography>
        </Stack>
      )}
    </>
  );
}
