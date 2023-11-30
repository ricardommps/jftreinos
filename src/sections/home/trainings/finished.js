import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { StyledBadge } from './styles';
import TrainingItem from './training-item';

export default function Finished({ finalized }) {
  const theme = useTheme();
  return (
    <Accordion
      square={true}
      sx={{
        border: `2px solid ${theme.palette.success.main}`,
        borderRadius: '6px',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <StyledBadge badgeContent={finalized.length} color="primary">
          <Typography>Finalizados</Typography>
        </StyledBadge>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {finalized.map((training) => (
            <TrainingItem training={training} key={training.id} finished={true} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
