import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import useHome from 'src/hooks/use-home';
import { fDateCalender } from 'src/utils/format-time';
import { getModuleName } from 'src/utils/modules';

import FinishTrainingForm from './ finish-training-form';
import FinishGymTrainingForm from './finish-gym-training-form';

export default function FinishTraining({
  open,
  onClose,
  trainingId,
  event,
  type,
  unrealizedTraining,
}) {
  const { finishedtraining, finishedtrainingDetailStatus } = useHome();

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
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> Finalizar Treino</DialogTitle>
      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <Stack>
          <ListItemText
            sx={{ mb: 1 }}
            primary={getModuleName(event.title)}
            secondary={fDateCalender(event.start)}
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'subtitle2',
              color: 'text.disabled',
            }}
          />
        </Stack>
        <Stack pt={2}>
          {type === 2 || unrealizedTraining ? (
            <FinishGymTrainingForm
              trainingId={trainingId}
              onClose={onClose}
              unrealizedTraining={unrealizedTraining}
            />
          ) : (
            <>
              <Typography>Métricas do treino</Typography>
              <FinishTrainingForm trainingId={trainingId} onClose={onClose} />
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
