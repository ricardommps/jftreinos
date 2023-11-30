import { useTheme } from '@emotion/react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import TrainingItem from './training-item';

export default function CurrentTraining({ currentTraining }) {
  const theme = useTheme();
  return (
    <Stack
      p={2}
      sx={{
        border: `2px solid ${theme.palette.info.main}`,
        borderRadius: '6px',
      }}
    >
      <Typography>Próximo treino</Typography>
      <TrainingItem training={currentTraining} />
    </Stack>
  );
}
