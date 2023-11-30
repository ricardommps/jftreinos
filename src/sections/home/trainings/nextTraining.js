import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { StyledBadge } from './styles';
import TrainingItem from './training-item';

export default function NextTraining({ trainings }) {
  const theme = useTheme();
  return (
    <Accordion
      square={true}
      sx={{
        border: `2px solid ${theme.palette.warning.main}`,
        borderRadius: '6px',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <StyledBadge badgeContent={trainings.length} color="primary">
          <Typography>Próximos</Typography>
        </StyledBadge>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {trainings.map((training) => (
            <TrainingItem training={training} key={training.id} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
