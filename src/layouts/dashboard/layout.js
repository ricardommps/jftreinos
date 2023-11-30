import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PasswordAlert from 'src/components/password-alert/password-alert';

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
        <PasswordAlert />
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
