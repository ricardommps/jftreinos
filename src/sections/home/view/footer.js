import ArchiveIcon from '@mui/icons-material/Archive';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaidIcon from '@mui/icons-material/Paid';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import useInvoice from 'src/hooks/use-invoice';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

export default function Footer() {
  const theme = useTheme();
  const router = useRouter();
  const { invoiceTotalPaid, onGetTotalPaind } = useInvoice();
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
      {invoiceTotalPaid.totalPaid > 0 && (
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
    </Stack>
  );
}
