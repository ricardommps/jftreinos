import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';

import FinishTraining from './ finish-training';
import TrainingDetails from './training-details';
export default function TrainingItem({ training, finished = false }) {
  const finishedTraining = useBoolean();

  const [isFinished, setIsFinished] = useState(finished);

  Date.prototype.withoutTime = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  useEffect(() => {
    if (training.finished[0] !== null) {
      setIsFinished(true);
    }
  }, []);

  return (
    <>
      <Card variant="outlined">
        <Button
          sx={{ position: 'absolute', top: 8, right: 8 }}
          variant="outlined"
          color={isFinished ? 'warning' : 'success'}
          onClick={finishedTraining.onTrue}
        >
          {isFinished ? 'Editar' : 'Finalizar'}
        </Button>
        <Stack sx={{ p: 2, pb: 2 }}>
          <ListItemText
            sx={{ mb: 1 }}
            primary={training.name}
            secondary={
              <Stack>
                <>
                  {' '}
                  {training.date_published &&
                    format(new Date(training.date_published), 'dd/MM/yyyy', { locale: ptBR })}
                  {training.training_date_other && (
                    <>
                      {' ou '}
                      {training.training_date_other &&
                        format(new Date(training.training_date_other), 'dd/MM/yyyy', {
                          locale: ptBR,
                        })}
                    </>
                  )}
                </>
              </Stack>
            }
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
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack>
          <TrainingDetails description={training.description} />
        </Stack>
      </Card>
      <FinishTraining
        open={finishedTraining.value}
        onClose={finishedTraining.onFalse}
        trainingId={training.id}
      />
    </>
  );
}
