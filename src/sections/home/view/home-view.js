'use client';

// @mui
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
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
          borderRadius: 2,
          padding: '10px 0',
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <ListProgram />
      </Box>
    </>
  );
}
