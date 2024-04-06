import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TablePaceSpeed from 'src/components/table-pace-speed/table-pace-speed';

export default function DialogTablePaceSpeed({ open, onClose }) {
  return (
    <Dialog fullScreen open={open}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        <Stack
          pb={3}
          direction="column"
          spacing={2}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant="h6"> Tabela Pace km/h </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <TablePaceSpeed minWidth={200} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
