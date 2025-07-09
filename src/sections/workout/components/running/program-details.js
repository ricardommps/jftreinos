import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import ProgramInfo from 'src/sections/programs/program-info';
import { fDate } from 'src/utils/format-time';

export default function ProgramDetails({ program }) {
  const [anchorElProgramDetais, setAnchorElProgramDetais] = useState(null);
  const openProgramDetais = Boolean(anchorElProgramDetais);
  const idProgramDetaisPopover = openProgramDetais ? 'program-details-popover' : undefined;

  const handleOpenProgramDetais = (event) => {
    setAnchorElProgramDetais(event.currentTarget);
  };

  const handleCloseProgramDetais = () => {
    setAnchorElProgramDetais(null);
  };
  return (
    <>
      <Stack textAlign={'center'} spacing={2} sx={{ bgcolor: 'background.neutral' }} p={2}>
        <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
          <Typography variant="h5">{program?.name}</Typography>
          <IconButton
            aria-label="info"
            size="small"
            sx={{ color: (theme) => theme.palette.text.primary }}
            onClick={handleOpenProgramDetais}
          >
            <InfoIcon />
          </IconButton>
        </Stack>
        {program.startDate && program.endDate && (
          <Typography variant="subtitle2">{`${fDate(program.startDate, 'dd/MM/yyyy')} - ${fDate(
            program.endDate,
            'dd/MM/yyyy',
          )}`}</Typography>
        )}
      </Stack>
      <Popover
        id={idProgramDetaisPopover}
        open={openProgramDetais}
        anchorEl={anchorElProgramDetais}
        onClose={handleCloseProgramDetais}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, position: 'relative' }}>
          {/* Botão de Fechar */}
          <IconButton
            aria-label="close"
            size="small"
            onClick={handleCloseProgramDetais}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Iconify icon="eva:close-fill" />
          </IconButton>
          <Box pt={3}>
            <ProgramInfo program={program} />
          </Box>
        </Box>
      </Popover>
    </>
  );
}
