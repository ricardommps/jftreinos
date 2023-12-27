import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { extrapolation } from 'src/utils/extrapolation';

import DialogTablePaceSpeed from '../dialog-table-pace-speed/dialog-table-pace-speed';
import ExtrapolativeValidity from '../extrapolative-validity/extrapolative-validity';
export default function ProgramInfo({ programDetail }) {
  const extrapolativeValidity = useBoolean();
  const openTable = useBoolean();

  const [currentExtrapolation, setCurrentExtrapolation] = useState(null);

  const getExtrapolationByPv = () => {
    const resultValue = extrapolation[programDetail.pv];
    setCurrentExtrapolation(resultValue);
  };

  useEffect(() => {
    if (programDetail.pv) {
      getExtrapolationByPv();
    }
  }, [programDetail]);
  const renderTitle = <Typography variant="h4">Informações do Programa</Typography>;
  const renderContent = (
    <Stack spacing={2}>
      <Stack flexDirection={'row'} spacing={5}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          {programDetail.name}
        </Typography>
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
        <IconButton sx={{ padding: 0 }} onClick={openTable.onTrue}>
          <Iconify icon="eva:info-outline" />
        </IconButton>
      </Stack>

      {programDetail.goal && (
        <>
          <Divider />
          <Typography>{`Objetivo: ${programDetail.goal}`}</Typography>
        </>
      )}
      {currentExtrapolation?.VO2 && (
        <>
          <Divider />
          <Typography>{`Vo2 Max: ${currentExtrapolation?.VO2}`}</Typography>
        </>
      )}
      {programDetail.pv && (
        <>
          <Divider />
          <Typography>{`PV: ${programDetail.pv}`}</Typography>
        </>
      )}
      {programDetail.pace && (
        <>
          <Divider />
          <Typography>{`Pace: ${programDetail.pace}`}</Typography>
        </>
      )}
      {programDetail.vla && (
        <>
          <Divider />
          <Stack flexDirection={'row'} spacing={5}>
            <Typography>{`Vla: ${programDetail.vla}`}</Typography>
            {programDetail.paceVla && (
              <Typography>{`Pace Vla: ${programDetail.paceVla}`}</Typography>
            )}
          </Stack>
        </>
      )}
      {programDetail.vlan && (
        <>
          <Divider />
          <Stack flexDirection={'row'} spacing={5}>
            <Typography>{`Vlan: ${programDetail.vlan}`}</Typography>
            {programDetail.paceVlan && (
              <Typography>{`Pace Vlan: ${programDetail.paceVlan}`}</Typography>
            )}
          </Stack>
        </>
      )}
      {programDetail.fcmValue && (
        <>
          <Divider />
          <Typography>FCM: {programDetail.fcmValue}</Typography>
        </>
      )}
    </Stack>
  );

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
        currentExtrapolation={currentExtrapolation}
      />
      {openTable.value && (
        <DialogTablePaceSpeed open={openTable.value} onClose={openTable.onFalse} />
      )}
    </>
  );
}
