import { useTheme } from '@emotion/react';
import { Box, Button, Fade, Link, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

export default function NewAppNotification({ open, onClose, platform }) {
  const theme = useTheme();

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
          sx={{ width: 160, height: 'auto', mt: 6 }}
        />
      </Fade>

      <Box
        component={m.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        sx={{ maxWidth: 600 }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: 32 }}>Ele voltou! 🚀</DialogTitle>

        <DialogContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            O App Foltz está de volta — totalmente renovado!
          </Typography>

          <Typography sx={{ mb: 3, fontSize: 18, lineHeight: 1.6 }}>
            Clique{' '}
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
            </Link>{' '}
            para acessar a {cfg.storeName} e baixar a nova versão e aproveitar todas as novidades
            que preparamos para você.
          </Typography>

          <Typography sx={{ mb: 3, fontSize: 18, lineHeight: 1.6 }}>
            Se você já tem o app instalado, atualize para a versão mais recente para continuar
            acessando normalmente.
          </Typography>

          {/* ⭐ SOMENTE ANDROID: bloco de texto extra */}
          {platform === 'android' && (
            <Typography sx={{ mb: 3, fontSize: 18, lineHeight: 1.6 }}>
              Se tiver qualquer dificuldade para acessar o app pela Google Play,{' '}
              <Link
                component="button"
                underline="always"
                sx={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: '#4dabf7',
                  '&:hover': { color: '#82cfff' },
                }}
                onClick={() =>
                  window.open(
                    'https://wa.me/5548991781646?text=Olá!%20Estou%20com%20dificuldades%20para%20acessar%20o%20app%20pela%20Google%20Play.',
                    '_blank',
                  )
                }
              >
                clique aqui
              </Link>{' '}
              e solicite seu acesso. Estamos aqui para ajudar!
            </Typography>
          )}

          <Typography sx={{ fontSize: 18, lineHeight: 1.6 }}>
            Ah, e atenção: agora o login deve ser feito com o mesmo e-mail utilizado na versão web.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onClose}
            sx={{
              background: 'white',
              color: 'black',
              fontWeight: 'bold',
              px: 6,
              py: 1.5,
              borderRadius: '12px',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: theme.palette.grey[200],
                transform: 'scale(1.05)',
              },
            }}
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
