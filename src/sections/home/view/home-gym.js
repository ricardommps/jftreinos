import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingProgress from 'src/components/loading-progress';
import Scrollbar from 'src/components/scrollbar';
import { fDate } from 'src/utils/format-time';

import WorkoutItem from '../../workout/workout-item';

export default function HomeGym({ workouts, workoutsStatus, program, loading }) {
  return (
    <>
      <Stack textAlign={'center'} spacing={2} sx={{ bgcolor: 'background.neutral' }} p={2}>
        <Typography variant="h5">{program.name}</Typography>
        {program.startDate && program.endDate && (
          <Typography variant="subtitle2">{`${fDate(program.startDate, 'dd/MM/yyyy')} - ${fDate(
            program.endDate,
            'dd/MM/yyyy',
          )}`}</Typography>
        )}
      </Stack>
      <Box sx={{ mx: 3 }} pt={3} id={'contente'} pb={'100px'}>
        {loading && <LoadingProgress />}
        {(!workoutsStatus.loading || !loading) && !workoutsStatus.empty && workouts && (
          <Scrollbar>
            <Stack spacing={2}>
              {workouts?.map((workout) => (
                <WorkoutItem key={workout.id} workout={workout} />
              ))}
            </Stack>
          </Scrollbar>
        )}
      </Box>
    </>
  );
}
