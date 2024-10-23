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
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useCallback, useEffect } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import RatingDialog from 'src/components/rating-dialog';
import useAnamnese from 'src/hooks/use-anamnese';
import { useBoolean } from 'src/hooks/use-boolean';
import useRating from 'src/hooks/use-rating';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

export default function HomeView() {
  const theme = useTheme();
  const router = useRouter();
  const { user, refreshMe } = useAuthContext();
  const { onClearAnamneseState } = useAnamnese();
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

  const handleOpenAnamnese = useCallback(() => {
    router.replace(paths.anamnese.root);
  }, [router]);

  const handleNotRating = () => {
    onSaveRating({
      notRating: true,
    });
  };

  useEffect(() => {
    refreshMe();
    onClearAnamneseState();
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
    <Box
      sx={{
        overflow: 'hidden', // Remove a rolagem
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
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
      <Box sx={{ mx: 3 }}>
        <Grid container spacing={4} pt={10}>
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                width: 100,
                height: 100,
              }}
              onClick={handleOpenPrograms}
            >
              <Card
                sx={{
                  backgroundColor: '#00A887',
                  height: 80,
                  width: 80,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SmartphoneIcon sx={{ color: 'white', fontSize: 30 }} />
              </Card>
              <Typography sx={{ marginTop: 1, color: 'white', fontSize: 12, fontWeight: 500 }}>
                Meus treinos
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                width: 100,
                height: 100,
              }}
              onClick={handleOpenHistoric}
            >
              <Card
                sx={{
                  backgroundColor: '#F0F2F5',
                  height: 80,
                  width: 80,
                  borderRadius: 2,
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
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                width: 100,
                height: 100,
              }}
              onClick={handleOpenMetrics}
            >
              <Card
                sx={{
                  backgroundColor: '#F0F2F5',
                  height: 80,
                  width: 80,
                  borderRadius: 2,
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
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 16,
            left: '16px', // Margem da esquerda
            right: '16px', // Margem da direita
            zIndex: theme.zIndex.modal + 1,
          }}
          onClick={handleOpenAnamnese}
        >
          Anamnese
        </Button>
      </Box>

      {ratingOpen.value && <RatingDialog open={ratingOpen.value} onClose={ratingOpen.onFalse} />}
    </Box>
  );
}
