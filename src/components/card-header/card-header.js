import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify/iconify';
import { getModuleName } from 'src/utils/modules';

export default function CardHeader({ title, action, onOpenTable }) {
  return (
    <Box position={'fixed'} pt={2} bgcolor={'#212B36'} width={'100%'} zIndex={100}>
      <Stack direction="row">
        <Stack direction="column" flex={1}>
          <Stack spacing={1.5} direction="row" pl={2}>
            <Button
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
              onClick={action}
            >
              Voltar
            </Button>
          </Stack>
          <DialogTitle sx={{ paddingTop: '0px !important' }}>{getModuleName(title)}</DialogTitle>
        </Stack>
        <Stack>
          <Stack spacing={1.5} direction="row" mt={0.5} pr={2}>
            <Typography>Tabela Pace/Km</Typography>
            <IconButton sx={{ padding: 0 }} onClick={onOpenTable}>
              <Iconify icon="eva:info-outline" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
