import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import ExtrapolativeValidity from '../extrapolative-validity/extrapolative-validity';
export default function ProgramInfo() {
  const extrapolativeValidity = useBoolean();
  const mdUp = useResponsive('up', 'md');
  console.log('--mdUp--', mdUp);
  const renderTitle = <Typography variant="h4">Informações do Programa</Typography>;
  const renderContent = (
    <Stack spacing={2}>
      <Stack flexDirection={'row'} spacing={5}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Desenvolvimento I
        </Typography>
        <Button sx={{ padding: !mdUp ? 0 : '6px 8px' }} startIcon={<PictureAsPdfIcon />}>
          Baixar pdf
        </Button>
      </Stack>
      <Divider />
      <Stack spacing={1.5} direction="row">
        <Typography>Validade Extrapolativa</Typography>
        <IconButton sx={{ padding: 0 }} onClick={extrapolativeValidity.onTrue}>
          <Iconify icon="eva:info-outline" />
        </IconButton>
      </Stack>
      <Stack spacing={1.5} direction="row">
        <Typography>Tabela Pace/Km</Typography>
        <IconButton sx={{ padding: 0 }}>
          <Iconify icon="eva:info-outline" />
        </IconButton>
      </Stack>
      <Divider />
      <Typography>Objetivo: Prova Maratona de Jurerê</Typography>
      <Divider />
      <Typography>Vo2 Max: 28,0</Typography>
      <Divider />
      <Typography>PV: 8 Km/H</Typography>
      <Divider />
      <Typography>Pace: 7.5</Typography>
      <Divider />
      <Stack flexDirection={'row'} spacing={5}>
        <Typography>Vla: 4.8 km/h</Typography>
        <Typography>Pace Vla: 15.0</Typography>
      </Stack>
      <Divider />
      <Stack flexDirection={'row'} spacing={5}>
        <Typography>Vla: 4.8 km/h</Typography>
        <Typography>Pace Vla: 15.0</Typography>
      </Stack>
      <Divider />
      <Typography>FCM: 180</Typography>
      <Divider />
    </Stack>
  );

  if (!mdUp) {
    return (
      <>
        <Stack component={Card} spacing={3}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {renderTitle}
            </AccordionSummary>
            <AccordionDetails>{renderContent}</AccordionDetails>
          </Accordion>
        </Stack>
        <ExtrapolativeValidity
          open={extrapolativeValidity.value}
          onClose={extrapolativeValidity.onFalse}
        />
      </>
    );
  }
  return (
    <>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        {renderTitle}
        {renderContent}
      </Stack>
      <ExtrapolativeValidity
        open={extrapolativeValidity.value}
        onClose={extrapolativeValidity.onFalse}
      />
    </>
  );
}
