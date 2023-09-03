'use client';

// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useAuthContext } from 'src/auth/hooks';

import ListProgram from '../program/list-programs';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { user } = useAuthContext();
  return (
    <>
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
        <Stack sx={{ alignItems: 'center' }}>
          <Typography variant="h4"> {user.name} </Typography>
          <Typography variant="h4"> {user.email} </Typography>
        </Stack>
      </Box>
      <Box py={2} />
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
