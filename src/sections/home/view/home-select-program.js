'use client';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useCallback } from 'react';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import ItemProgram from 'src/sections/programs/item-program';

import Footer from './footer';

export default function HomeSelectProgram({ programs }) {
  console.log('--HomeSelectProgram-', programs);
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
    (id, type) => {
      if (type === 2) {
        router.push(paths.dashboard.home.gym(id));
      } else {
        router.push(paths.dashboard.home.running(id));
      }
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
      <Footer />
    </Box>
  );
}
