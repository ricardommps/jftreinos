import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { StyledBadge } from './styles';
import TrainingItem from './training-item';

export default function Expired({ expired }) {
  const theme = useTheme();
  return (
    <Accordion
      square={true}
      sx={{
        border: `2px solid ${theme.palette.error.main}`,
        borderRadius: '6px',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <StyledBadge badgeContent={expired.length} color="primary">
          <Typography>Vencidos</Typography>
        </StyledBadge>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {expired.map((training) => (
            <TrainingItem training={training} key={training.id} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
