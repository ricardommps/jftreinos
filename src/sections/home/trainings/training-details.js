import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const StyledPre = styled('pre')(() => ({
  marginTop: 0,
  wordWrap: 'break-word',
}));

export default function TrainingDetails({ description }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Detalhes do treino</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingTop: 0 }}>
        <StyledPre>{description}</StyledPre>
      </AccordionDetails>
    </Accordion>
  );
}
