import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogContent from 'src/components/dialog-custom/dialog-content';
import CustomizedDialogs from 'src/components/dialog-custom/dialog-custom';
import DialogTitle from 'src/components/dialog-custom/dialog-title';

import { StyledDialogActions } from './styles';

export function ExtrapolativeValidityDialog({ open, onClose, children }) {
  return (
    <CustomizedDialogs open={open} onClose={onClose}>
      <DialogTitle>
        <Typography sx={{ fontWeight: 800 }}>Validade Extrapolativa</Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <StyledDialogActions>
        <Button
          color="inherit"
          variant="outlined"
          sx={{ mb: 1, minWidth: '45%', marginLeft: '8px' }}
          onClick={onClose}
        >
          Fechar
        </Button>
      </StyledDialogActions>
    </CustomizedDialogs>
  );
}
