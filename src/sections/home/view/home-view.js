'use client';

// @mui
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useCallback } from 'react';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

import ListProgram from '../program/list-programs';

// ----------------------------------------------------------------------

export default function HomeView() {
  const router = useRouter();
  const handleOpenMetrics = useCallback(() => {
    router.push(paths.dashboard.metrics.root());
  }, [router]);
  return (
    <>
      <Box
        sx={{
          mt: 1,
          width: 1,
          height: 'auto',
        }}
      >
        <Stack sx={{ alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<ShowChartIcon />}
            color="warning"
            fullWidth
            onClick={handleOpenMetrics}
          >
            Métricas
          </Button>
        </Stack>
      </Box>
      <Box py={1} />
      <Box
        sx={{
          mt: 1,
          width: 1,
          height: 'auto',
          padding: '10px 0',
        }}
      >
        <ListProgram />
      </Box>
    </>
  );
}
