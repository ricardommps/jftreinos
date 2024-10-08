'use client';

import PropTypes from 'prop-types';
// auth
import { RoleBasedGuard } from 'src/auth/guard';
// components
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <RoleBasedGuard>
      <AuthClassicLayout>{children}</AuthClassicLayout>
    </RoleBasedGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
