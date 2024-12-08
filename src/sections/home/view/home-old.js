'use client';

import ArchiveIcon from '@mui/icons-material/Archive';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import ItemProgram from 'src/sections/home/program/item-program';

export default function HomeOld({ programs }) {
  const theme = useTheme();
  const router = useRouter();
  const handleOpenMetrics = useCallback(() => {
    router.push(paths.dashboard.metrics.root());
  }, [router]);

  const handleOpenHistoric = useCallback(() => {
    router.push(paths.dashboard.historic.root());
  }, [router]);

  const handleOpenAnamnese = useCallback(() => {
    router.replace(paths.anamnese.root);
  }, [router]);

  const handleView = useCallback(
    (id) => {
      router.push(paths.dashboard.home.details(id));
    },
    [router],
  );

  return (
    <Box p={3}>
      <Box
        pb={10}
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {programs?.map((program) => (
          <ItemProgram program={program} onView={handleView} key={program.id} />
        ))}
      </Box>
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
              height: 50,
              width: 50,
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
              height: 50,
              width: 50,
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
              height: 50,
              width: 50,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArchiveIcon sx={{ color: 'black', fontSize: 30 }} />
          </Card>
          <Typography sx={{ marginTop: 1, color: 'white', fontSize: 12, fontWeight: 500 }}>
            Anamnese
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
