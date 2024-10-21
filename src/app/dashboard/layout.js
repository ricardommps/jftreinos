'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// auth
import { AuthGuard } from 'src/auth/guard';
// components
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    // Funções para atualizar o status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Adicionar listeners para os eventos online/offline
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Remover listeners quando o componente for desmontado
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return (
    <AuthGuard>
      {!isOnline && (
        <Box sx={{ marginTop: '70px' }}>
          <Alert variant="filled" severity="error">
            {'Você está sem internet. Verifique sua conexão antes de continuar'}
          </Alert>
        </Box>
      )}

      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
