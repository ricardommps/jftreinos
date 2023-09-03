import { useTheme } from '@emotion/react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useBoolean } from 'src/hooks/use-boolean';

import FinishTraining from './ finish-training';
import TrainingDetails from './training-details';
export default function TrainingItem({ expired, finished, current, title, date }) {
  const theme = useTheme();
  const finishedTraining = useBoolean();

  const getBorderItem = () => {
    if (finished) {
      return `2px solid ${theme.palette.success.main}`;
    }
    if (expired) {
      return `2px solid ${theme.palette.error.main}`;
    }
    if (current) {
      return `2px solid ${theme.palette.warning.main}`;
    }
    return 'none';
  };
  return (
    <>
      <Card
        sx={{
          border: getBorderItem(),
          borderRadius: 2,
        }}
        variant="outlined"
      >
        <Button
          sx={{ position: 'absolute', top: 8, right: 8 }}
          variant="outlined"
          color={finished ? 'warning' : 'success'}
          onClick={finishedTraining.onTrue}
        >
          {finished ? 'Editar' : 'Finalizar'}
        </Button>
        <Stack sx={{ p: 2, pb: 2 }}>
          <ListItemText
            sx={{ mb: 1 }}
            primary={title}
            secondary={`Data do treino: ${date}`}
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
          <TrainingDetails />
        </Stack>
      </Card>
      <FinishTraining open={finishedTraining.value} onClose={finishedTraining.onFalse} />
    </>
  );
}
