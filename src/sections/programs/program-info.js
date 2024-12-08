import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import ExertionZone from 'src/components/exertion-zone/exertion-zone';
import Iconify from 'src/components/iconify/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { extrapolation } from 'src/utils/extrapolation';

import DialogTablePaceSpeed from './dialog-table-pace-speed/dialog-table-pace-speed';
import ExtrapolativeValidity from './extrapolative-validity/extrapolative-validity';

export default function ProgramInfo({ program }) {
  const extrapolativeValidity = useBoolean();
  const openTable = useBoolean();
  const exertionZone = useBoolean();

  const [currentExtrapolation, setCurrentExtrapolation] = useState(null);

  const getExtrapolationByPv = () => {
    const resultValue = extrapolation[program.pv];
    setCurrentExtrapolation(resultValue);
  };

  useEffect(() => {
    if (program.pv) {
      getExtrapolationByPv();
    }
  }, [program]);
  const renderTitle = <Typography variant="h4">Informações do Programa</Typography>;
  const renderContent = (
    <Stack spacing={2}>
      <Stack flexDirection={'row'} spacing={5}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          {program.name}
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
        <Typography>Tabela Pace km-h</Typography>
        <IconButton sx={{ padding: 0 }} onClick={openTable.onTrue}>
          <Iconify icon="eva:info-outline" />
        </IconButton>
      </Stack>
      <Stack spacing={1.5} direction="row">
        <Typography>Zona de esforço</Typography>
        <IconButton sx={{ padding: 0 }} onClick={exertionZone.onTrue}>
          <Iconify icon="eva:info-outline" />
        </IconButton>
      </Stack>

      {program.goal && (
        <>
          <Divider />
          <Typography>{`Objetivo: ${program.goal}`}</Typography>
        </>
      )}
      {currentExtrapolation?.VO2 && (
        <>
          <Divider />
          <Typography>{`Vo2 Max: ${currentExtrapolation?.VO2}`}</Typography>
        </>
      )}
      {program.pv && (
        <>
          <Divider />
          <Stack flexDirection={'row'} spacing={5}>
            <Typography>{`PV: ${program.pv}`}</Typography>
            {program.pace && (
              <>
                <Typography>{`Pace do PV: ${program.pace}`}</Typography>
              </>
            )}
          </Stack>
        </>
      )}

      {program.vla && (
        <>
          <Divider />
          <Stack flexDirection={'row'} spacing={5}>
            <Typography>{`Vla: ${program.vla}`}</Typography>
            {program.paceVla && <Typography>{`Pace Vla: ${program.paceVla}`}</Typography>}
          </Stack>
        </>
      )}
      {program.vlan && (
        <>
          <Divider />
          <Stack flexDirection={'row'} spacing={5}>
            <Typography>{`Vlan: ${program.vlan}`}</Typography>
            {program.paceVlan && <Typography>{`Pace Vlan: ${program.paceVlan}`}</Typography>}
          </Stack>
        </>
      )}
      {program.fcmValue && (
        <>
          <Divider />
          <Typography>FCM: {program.fcmValue}</Typography>
        </>
      )}
    </Stack>
  );

  return (
    <>
      <Stack spacing={3}>
        {renderTitle}
        {renderContent}
      </Stack>
      <ExtrapolativeValidity
        open={extrapolativeValidity.value}
        onClose={extrapolativeValidity.onFalse}
        currentExtrapolation={currentExtrapolation}
      />
      {openTable.value && (
        <DialogTablePaceSpeed open={openTable.value} onClose={openTable.onFalse} />
      )}
      {exertionZone.value && (
        <ExertionZone
          open={exertionZone.value}
          onClose={exertionZone.onFalse}
          pv={program.pv}
          pace={program.pace}
          vla={program.vla}
          paceVla={program.paceVla}
          vlan={program.vlan}
          paceVlan={program.paceVlan}
        />
      )}
    </>
  );
}
