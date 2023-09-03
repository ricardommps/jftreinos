// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

//
import { HeaderSimple as Header } from '../_common';

// ----------------------------------------------------------------------

export default function CompactLayout({ children }) {
  return (
    <>
      <Header />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}

CompactLayout.propTypes = {
  children: PropTypes.node,
};
