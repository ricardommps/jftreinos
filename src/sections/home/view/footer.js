import ArchiveIcon from '@mui/icons-material/Archive';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaidIcon from '@mui/icons-material/Paid';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import useHome from 'src/hooks/use-home';
import useInvoice from 'src/hooks/use-invoice';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

export default function Footer() {
  const theme = useTheme();
  const router = useRouter();
  const { invoiceTotalPaid, onGetTotalPaind } = useInvoice();
  const { alertOverdue, onShowAlertOverdue, onHideAlertOverdue, alertOverdueHide } = useHome();

  const handleClose = () => {
    onHideAlertOverdue();
  };

  const handleOpenMetrics = useCallback(() => {
    router.push(paths.dashboard.metrics.root());
  }, [router]);

  const handleOpenHistoric = useCallback(() => {
    router.push(paths.dashboard.historic.root());
  }, [router]);

  const handleOpenAnamnese = useCallback(() => {
    router.replace(paths.anamnese.root);
  }, [router]);

  const handleOpenInvoice = useCallback(() => {
    onHideAlertOverdue();
    router.push(paths.dashboard.invoice.root);
  }, [router]);

  const initialize = useCallback(async () => {
    try {
      await onGetTotalPaind();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (invoiceTotalPaid.totalOverdue > 0 && !alertOverdueHide) {
      onShowAlertOverdue();
    }
  }, [invoiceTotalPaid.totalOverdue, alertOverdueHide]);

  return (
    <Stack
      id={'footer'}
      flexDirection={'row'}
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.modal + 1,
        bgcolor: (theme) => theme.palette.grey[900],
        width: '100%',
        padding: 2, // Para adicionar espaçamento interno no footer
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        onClick={handleOpenHistoric}
      >
        <Card
          sx={{
            backgroundColor: '#F0F2F5',
            height: 30,
            width: 30,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArchiveIcon sx={{ color: 'black', fontSize: 30 }} />
        </Card>
        <Typography sx={{ marginTop: 1, color: 'white', fontSize: 12, fontWeight: 500 }}>
          Histórico
        </Typography>
      </Box>
      {false && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
          onClick={handleOpenMetrics}
        >
          <Card
            sx={{
              backgroundColor: '#F0F2F5',
              height: 30,
              width: 30,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShowChartIcon sx={{ color: 'black', fontSize: 30 }} />
          </Card>
          <Typography sx={{ marginTop: 1, color: 'white', fontSize: 12, fontWeight: 500 }}>
            Minhas Métricas
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        onClick={handleOpenAnamnese}
      >
        <Card
          sx={{
            backgroundColor: '#F0F2F5',
            height: 30,
            width: 30,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AssignmentIcon sx={{ color: 'black', fontSize: 30 }} />
        </Card>
        <Typography sx={{ marginTop: 1, color: 'white', fontSize: 12, fontWeight: 500 }}>
          Anamnese
        </Typography>
      </Box>
      {(invoiceTotalPaid.totalPaid > 0 || invoiceTotalPaid.totalOverdue > 0) && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
          onClick={handleOpenInvoice}
        >
          <Card
            sx={{
              backgroundColor: '#F0F2F5',
              height: 30,
              width: 30,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PaidIcon sx={{ color: 'black', fontSize: 30 }} />
          </Card>
          <Typography sx={{ marginTop: 1, color: 'white', fontSize: 12, fontWeight: 500 }}>
            Faturas
          </Typography>
        </Box>
      )}
      {invoiceTotalPaid.totalOverdue > 0 && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={alertOverdue}
          transitionDuration={{
            enter: theme.transitions.duration.shortest,
            exit: theme.transitions.duration.shortest - 80,
          }}
        >
          <DialogTitle>Faturas vencidas</DialogTitle>
          <DialogContent>
            <Alert variant="outlined" severity="error">
              <Typography sx={{ mb: 3 }}>
                Você possui débitos pendentes. Realize o pagamento para evitar a interrupção do
                serviço.
              </Typography>
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Fechar
            </Button>

            <Button variant="contained" color="success" onClick={handleOpenInvoice}>
              Ver faturas
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  );
}
