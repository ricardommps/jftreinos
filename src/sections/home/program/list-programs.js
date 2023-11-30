import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useCallback, useEffect } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import useHome from 'src/hooks/use-home';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

import ItemProgram from './item-program';
export default function ListProgram() {
  const router = useRouter();
  const { onListPrograms, programsStatus, programs } = useHome();

  const handleView = useCallback(
    (id) => {
      router.push(paths.dashboard.home.details(id));
    },
    [router],
  );

  useEffect(() => {
    onListPrograms();
  }, []);
  return (
    <Stack p={2}>
      <CustomBreadcrumbs
        heading="Meus Programas"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {programsStatus.loading && (
        <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
          <Box
            sx={{
              mt: 1,
              width: 1,
              height: 320,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress color="error" />
          </Box>
        </Stack>
      )}
      {!programsStatus.loading && programs && (
        <Box
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
      )}
    </Stack>
  );
}
