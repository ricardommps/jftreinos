import Box from '@mui/material/Box';
import PropTypes from 'prop-types'; // @mui
import { useResponsive } from 'src/hooks/use-responsive';

import { HEADER, NAV } from '../config-layout';

// ----------------------------------------------------------------------

const SPACING = 5;

export default function Main({ children, sx, ...other }) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_VERTICAL}px)`,
        }),
        paddingBottom: 0,
        ...sx,
      }}
      {...other}
    >
      <>{children}</>
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
