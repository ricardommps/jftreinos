import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// @mui
import { forwardRef } from 'react';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const LogoSum = forwardRef(({ disabledLink = false, sx }) => {
  const logo = (
    <Box
      component="img"
      src="/assets/logo/logo_sum.png"
      sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

export default LogoSum;
