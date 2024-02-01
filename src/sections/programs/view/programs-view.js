'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify/iconify';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import ListProgram from 'src/sections/home/program/list-programs';
export default function ProgramsView() {
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
