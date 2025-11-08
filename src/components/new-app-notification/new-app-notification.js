import { useTheme } from '@emotion/react';
import { Box, Button, Fade, Link, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { m } from 'framer-motion';

export default function NewAppNotification({ open, onClose }) {
  const theme = useTheme();

  const handleOpenAppStore = () => {
    window.open('https://apps.apple.com/br/app/6750486916', '_blank');
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
      {/* Logo animada */}
      <Fade in={open} timeout={1000}>
        <Box
          component={m.img}
          src="/assets/logo/logo.png"
          alt="Foltz logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          sx={{
            width: 160,
            height: 'auto',
            mt: 6,
          }}
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
              onClick={handleOpenAppStore}
            >
              aqui
            </Link>{' '}
            para acessar a App Store e baixar a nova versão e aproveitar todas as novidades que
            preparamos para você.
          </Typography>

          <Typography sx={{ mb: 3, fontSize: 18, lineHeight: 1.6 }}>
            Se você já tem o app instalado, atualize para a versão mais recente para continuar
            acessando normalmente.
          </Typography>

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
