import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Iconify from 'src/components/iconify/iconify';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import TrainingsList from '../trainings/trainings-list';
import ProgramInfo from './program-info';
export default function ProgramDetails() {
  return (
    <>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Button
          component={RouterLink}
          href={paths.dashboard.home.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Voltar
        </Button>
      </Stack>
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <ProgramInfo />
        </Grid>
        <Grid xs={12} md={6}>
          <TrainingsList />
        </Grid>
      </Grid>
    </>
  );
}
