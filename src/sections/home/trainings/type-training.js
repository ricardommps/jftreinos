import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
export default function TypeTraining({
  open,
  onClose,
  typeTrainingSelected,
  setTypeTrainingSelected,
  onOpenFinishTraining,
}) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <DialogTitle>Finalizar treino</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="h6">Seu treino foi?</Typography>
        </Stack>
        <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 2 }}>
          <Paper
            variant="outlined"
            sx={{
              py: 2.5,
              textAlign: 'center',
              borderColor: typeTrainingSelected === 'indoor' && 'green',
            }}
            onClick={() => setTypeTrainingSelected('indoor')}
          >
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              Indoor
            </Typography>
            <Iconify icon={'tabler:treadmill'} color={'#1877F2'} width={32} mt={2} />
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              py: 2.5,
              textAlign: 'center',
              borderColor: typeTrainingSelected === 'outdoor' && 'green',
            }}
            onClick={() => setTypeTrainingSelected('outdoor')}
          >
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              Outdoor
            </Typography>
            <Iconify icon={'fa-solid:road'} color={'#1877F2'} width={32} mt={2} />
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="outlined" color="inherit" onClick={onOpenFinishTraining}>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
