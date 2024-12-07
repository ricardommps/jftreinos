import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import CardHeader from 'src/components/card-header/card-header';
import { useBoolean } from 'src/hooks/use-boolean';
import useWorkout from 'src/hooks/use-workout';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import FinishGymTrainingForm from 'src/sections/home/trainings/finish-gym-training-form';
import FinishTrainingForm from 'src/sections/home/trainings/finish-training-form';
import { fDateCalender } from 'src/utils/format-time';
import { getModuleName } from 'src/utils/modules';

export default function FinishWorkout({
  open,
  onClose,
  workout,
  unrealizedTraining,
  typeTrainingSelected,
}) {
  const router = useRouter();
  const { finished, finishedStatus } = useWorkout();
  const openTable = useBoolean();
  useEffect(() => {
    if (finished) {
      enqueueSnackbar('Treino finalizado com sucesso!', {
        autoHideDuration: 8000,
        variant: 'success',
      });
      router.replace(paths.dashboard.root);
    }
  }, [finished]);

  useEffect(() => {
    if (useBoolean.error) {
      enqueueSnackbar('Não foi possível executar esta operação. Tente novamente mais tarde.', {
        autoHideDuration: 8000,
        variant: 'error',
      });
      router.replace(paths.dashboard.root);
    }
  }, [finishedStatus.error]);

  return (
    <Dialog fullScreen open={open}>
      <CardHeader
        title={
          workout.running ? `Finalizar Treino ${typeTrainingSelected}` : 'Finalizar treino de força'
        }
        action={onClose}
        onOpenTable={openTable.onTrue}
        type={workout.running ? 1 : 2}
      />
      <Box mt={12}>
        <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
          <Stack>
            <ListItemText
              sx={{ mb: 1 }}
              primary={getModuleName(workout.name)}
              secondary={fDateCalender(workout.datePublished)}
              primaryTypographyProps={{
                typography: 'h6',
              }}
              secondaryTypographyProps={{
                mt: 1,
                component: 'span',
                typography: 'subtitle2',
                color: 'text.secondary',
              }}
            />
          </Stack>
          <Stack pt={2} pb={2}>
            {!workout.running || unrealizedTraining ? (
              <FinishGymTrainingForm
                workoutId={workout.id}
                onClose={onClose}
                unrealizedTraining={unrealizedTraining}
              />
            ) : (
              <>
                <FinishTrainingForm
                  workoutId={workout.id}
                  onClose={onClose}
                  typeTrainingSelected={typeTrainingSelected}
                  name={workout.name}
                  unrealizedTraining={unrealizedTraining}
                />
              </>
            )}
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
