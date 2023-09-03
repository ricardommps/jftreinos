import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useCallback } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

import ItemProgram from './item-program';
export default function ListProgram() {
  const router = useRouter();

  const handleView = useCallback(
    (id) => {
      router.push(paths.dashboard.home.details(id));
    },
    [router],
  );
  return (
    <Stack p={2}>
      <CustomBreadcrumbs
        heading="Meus Programas"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        <ItemProgram title={'Desenvolvimento II'} onView={() => handleView(1)} />
        <ItemProgram notActive={true} title={'Desenvolvimento I'} onView={() => handleView(2)} />
      </Box>
    </Stack>
  );
}
