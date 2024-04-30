import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify/iconify';

import RatingForm from './rating-form';
export default function RatingDialog({ open, onClose }) {
  return (
    <Dialog fullScreen open={open}>
      <Box position={'fixed'} pt={2} bgcolor={'#212B36'} width={'100%'} zIndex={100}>
        <Stack direction="row">
          <Stack direction="column" flex={1}>
            <Stack direction="row" pl={2}>
              <Button startIcon={<Iconify icon="eva:arrow-ios-back-fill" />} onClick={onClose}>
                Voltar
              </Button>
            </Stack>
            <DialogTitle sx={{ paddingTop: '0px !important' }}>Avalie a JF Assessoria</DialogTitle>
          </Stack>
        </Stack>
      </Box>
      <Box mt={12}>
        <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
          <RatingForm onClose={onClose} />
        </DialogContent>
      </Box>
    </Dialog>
  );
}
