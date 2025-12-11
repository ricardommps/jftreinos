import { Box, Button, Fade, Link, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

export default function NewAppNotification({ open, onClose, platform }) {
  const platformConfig = {
    ios: {
      storeName: 'App Store',
      link: 'https://apps.apple.com/br/app/6750486916',
    },
    android: {
      storeName: 'Google Play',
      link: 'https://play.google.com/store/apps/details?id=com.jftreinos.jfapp',
    },
  };

  const cfg = platformConfig[platform];

  const handleOpenStore = () => {
    window.open(cfg.link, '_blank');
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: 'linear-gradient(180deg, #000 0%, #111 100%)',
          color: 'white',
          textAlign: 'center',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // ⬅️ Centraliza verticalmente
        },
      }}
    >
      <Fade in={open} timeout={1000}>
        <Box
          component={m.img}
          src="/assets/logo/logo.png"
          alt="Foltz logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          sx={{ width: 160, height: 'auto' }} // ⬅️ removido o mt: 6
        />
      </Fade>

      <Box
        component={m.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        sx={{ maxWidth: 600 }}
      >
        <DialogContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Baixe a versão do app{' '}
            <Link
              component="button"
              underline="always"
              sx={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#4dabf7',
                '&:hover': { color: '#82cfff' },
              }}
              onClick={handleOpenStore}
            >
              aqui
            </Link>
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', mt: 4 }}>
          <Button
            color="inherit"
            variant="outlined"
            sx={{ mb: 1, minWidth: '45%', marginLeft: '8px' }}
            onClick={onClose}
          >
            Fechar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

NewAppNotification.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  platform: PropTypes.oneOf(['ios', 'android']).isRequired,
};
