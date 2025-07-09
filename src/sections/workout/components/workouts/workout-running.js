import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';

import WorkoutItem from '../../workout-item';
import AdditionalInfo from '../running/additional-info';
import Header from '../running/header';
import ProgramDetails from '../running/program-details';
import TrainingVolume from '../trainingVolume/trainingVolume';

export default function WorkoutsRunning({ workouts }) {
  const volume = useBoolean();

  const [filteredWorkouts, setFilteredWorkouts] = useState(null);

  const today = new Date();

  function toISOStringWithTimezone(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000; // Offset do fuso horário em milissegundos
    const localTime = new Date(date.getTime() - offsetMs); // Ajusta para o horário local

    const isoString = localTime.toISOString();
    return isoString.split('T')[0]; // Remove o 'Z' do final
  }

  function getFilteredWorkoutStart(workouts) {
    const currentDate = toISOStringWithTimezone(new Date());
    return workouts.filter((workout) => {
      const datePublished = toISOStringWithTimezone(new Date(workout.datePublished));
      return currentDate === datePublished;
    });
  }

  useEffect(() => {
    if (workouts?.items?.length > 0) {
      setFilteredWorkouts(getFilteredWorkoutStart(workouts.items, today));
    } else {
      setFilteredWorkouts([]); // Define como array vazio se não houver workouts
    }
  }, [workouts]);

  return (
    <>
      {workouts ? (
        <>
          {workouts?.program && (
            <>
              <ProgramDetails program={workouts?.program} />

              {workouts?.program?.additionalInformation && (
                <AdditionalInfo additionalInformation={workouts?.program?.additionalInformation} />
              )}
            </>
          )}

          <Header
            message={workouts?.message}
            workoutsItems={workouts?.items}
            setFilteredWorkouts={setFilteredWorkouts}
            volume={volume}
          />

          {volume.value && (
            <TrainingVolume
              open={volume.value}
              onClose={volume.onFalse}
              programId={workouts?.program?.id}
            />
          )}

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
                  <>
                    <Stack alignItems={'center'}>
                      <Typography variant="subtitle1">Nenhum treino</Typography>
                    </Stack>
                  </>
                )}
              </>
            )}
          </Box>
        </>
      ) : (
        <Stack alignItems={'center'}>
          <Typography variant="subtitle1">Nenhum treino teste</Typography>
        </Stack>
      )}
    </>
  );
}
