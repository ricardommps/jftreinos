import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import Header from './header';
import Main from './main';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Header />

      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >
        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
