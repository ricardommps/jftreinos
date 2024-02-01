'use client';

// @mui
import ArchiveIcon from '@mui/icons-material/Archive';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

export default function HomeView() {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const handleOpenMetrics = useCallback(() => {
    router.push(paths.dashboard.metrics.root());
  }, [router]);

  const handleOpenPrograms = useCallback(() => {
    router.push(paths.dashboard.programs.root());
  }, [router]);

  const handleOpenHistoric = useCallback(() => {
    router.push(paths.dashboard.historic.root());
  }, [router]);

  return (
    <Box p={1}>
      <Stack textAlign={'center'}>
        <Typography variant="h6">Olá, {user?.name}</Typography>
      </Stack>

      <Box display="grid" gap={3} gridTemplateColumns="repeat(2, 1fr)" p={3}>
        <Paper
          sx={{
            height: 140,
            backgroundColor: theme.palette.info.main,
          }}
          onClick={handleOpenPrograms}
        >
          <Stack justifyContent="center" alignItems="center" height={'100%'} direction="column">
            <Typography variant="h6">Meus treinos</Typography>
            <SmartphoneIcon sx={{ marginTop: 2, fontSize: 35 }} />
          </Stack>
        </Paper>
        <Paper
          sx={{
            height: 140,
            backgroundColor: theme.palette.info.main,
          }}
          onClick={handleOpenHistoric}
        >
          <Stack justifyContent="center" alignItems="center" height={'100%'} direction="column">
            <Typography variant="h6">Histórico</Typography>
            <ArchiveIcon sx={{ marginTop: 2, fontSize: 35 }} />
          </Stack>
        </Paper>
        <Paper
          sx={{
            height: 140,
            backgroundColor: theme.palette.info.main,
          }}
          onClick={handleOpenMetrics}
        >
          <Stack justifyContent="center" alignItems="center" height={'100%'} direction="column">
            <Typography variant="h6">Minhas Métricas</Typography>
            <ShowChartIcon sx={{ marginTop: 2, fontSize: 35 }} />
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
