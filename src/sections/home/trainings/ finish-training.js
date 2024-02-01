import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import CardHeader from 'src/components/card-header/card-header';
import { useBoolean } from 'src/hooks/use-boolean';
import useHome from 'src/hooks/use-home';
import { fDateCalender } from 'src/utils/format-time';
import { getModuleName } from 'src/utils/modules';

import DialogTablePaceSpeed from '../dialog-table-pace-speed/dialog-table-pace-speed';
import FinishTrainingForm from './ finish-training-form';
import FinishGymTrainingForm from './finish-gym-training-form';

export default function FinishTraining({
  open,
  onClose,
  trainingId,
  event,
  type,
  unrealizedTraining,
  typeTrainingSelected,
}) {
  const { finishedtraining, finishedtrainingDetailStatus } = useHome();
  const openTable = useBoolean();
  useEffect(() => {
    if (finishedtraining) {
      enqueueSnackbar('Treino finalizado com sucesso!', {
        autoHideDuration: 8000,
        variant: 'success',
      });
    }
  }, [finishedtraining]);

  useEffect(() => {
    if (finishedtrainingDetailStatus.error) {
      enqueueSnackbar('Não foi possível executar esta operação. Tente novamente mais tarde.', {
        autoHideDuration: 8000,
        variant: 'error',
      });
    }
  }, [finishedtrainingDetailStatus.error]);

  return (
    <Dialog fullScreen open={open}>
      <CardHeader
        title={`Finalizar Treino ${typeTrainingSelected}`}
        action={onClose}
        onOpenTable={openTable.onTrue}
      />
      <Box mt={12}>
        <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
          <Stack>
            <ListItemText
              sx={{ mb: 1 }}
              primary={getModuleName(event.title)}
              secondary={fDateCalender(event.start)}
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
            {type === 2 || unrealizedTraining ? (
              <FinishGymTrainingForm
                trainingId={trainingId}
                onClose={onClose}
                unrealizedTraining={unrealizedTraining}
              />
            ) : (
              <>
                <Typography>Métricas do treino</Typography>
                <FinishTrainingForm
                  trainingId={trainingId}
                  onClose={onClose}
                  typeTrainingSelected={typeTrainingSelected}
                  event={event}
                />
              </>
            )}
          </Stack>
        </DialogContent>
      </Box>
      {openTable.value && (
        <DialogTablePaceSpeed open={openTable.value} onClose={openTable.onFalse} />
      )}
    </Dialog>
  );
}
