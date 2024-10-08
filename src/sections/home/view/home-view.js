'use client';

// @mui
import ArchiveIcon from '@mui/icons-material/Archive';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import RatingDialog from 'src/components/rating-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import useRating from 'src/hooks/use-rating';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

export default function HomeView() {
  const theme = useTheme();
  const router = useRouter();
  const { user, refreshMe } = useAuthContext();
  const { onSaveRating, ratingStatus, rating } = useRating();
  //const [showAlert, setShowAlert] = useState(false);
  const ratingOpen = useBoolean();
  const handleOpenMetrics = useCallback(() => {
    router.push(paths.dashboard.metrics.root());
  }, [router]);

  const handleOpenPrograms = useCallback(() => {
    router.push(paths.dashboard.programs.root());
  }, [router]);

  const handleOpenHistoric = useCallback(() => {
    router.push(paths.dashboard.historic.root());
  }, [router]);

  const handleOpenShare = useCallback(() => {
    router.push(paths.dashboard.share.root());
  }, [router]);

  const handleNotRating = () => {
    onSaveRating({
      notRating: true,
    });
  };

  useEffect(() => {
    refreshMe();
  }, []);

  useEffect(() => {
    if (user) {
      //setShowAlert(!user?.rating && !user?.rating?.notRating);
    }
  }, [user]);

  useEffect(() => {
    if (rating) {
      refreshMe();
    }
  }, [rating]);

  return (
    <Box p={1}>
      {ratingStatus?.loading && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Stack textAlign={'center'}>
        <Typography variant="h6">Olá, {user?.name}</Typography>
      </Stack>
      {false && (
        <Box>
          <Alert severity="info">
            <AlertTitle>Avalie a JF Assessoria</AlertTitle>
            <Typography>
              Olá, {user?.name}!
              <br />
              Que tal avaliar sua experiência com a JF Assessoria e nos contar a sua história com a
              gente? <br />
              Seu feedback é extremamente importante para nós, pois nos ajuda a aperfeiçoar nossos
              serviços e oferecer a melhor experiência possível.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              pt={2}
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button variant="outlined" onClick={handleNotRating}>
                Não avaliar
              </Button>
              <Button variant="contained" onClick={ratingOpen.onTrue}>
                Avaliar
              </Button>
            </Stack>
          </Alert>
        </Box>
      )}
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
        {false && (
          <Paper
            sx={{
              height: 140,
              backgroundColor: theme.palette.info.main,
            }}
            onClick={handleOpenShare}
          >
            <Stack justifyContent="center" alignItems="center" height={'100%'} direction="column">
              <Typography variant="h6">Share</Typography>
              <ShowChartIcon sx={{ marginTop: 2, fontSize: 35 }} />
            </Stack>
          </Paper>
        )}
      </Box>
      {ratingOpen.value && <RatingDialog open={ratingOpen.value} onClose={ratingOpen.onFalse} />}
    </Box>
  );
}
