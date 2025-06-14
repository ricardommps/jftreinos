'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
// auth
import { AuthGuard } from 'src/auth/guard';
// components
import DashboardLayout from 'src/layouts/dashboard';

const checkInternetConnection = async () => {
  try {
    const response = await fetch('https://1.1.1.1/cdn-cgi/trace', { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
};

export default function Layout({ children }) {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(true);
  const checkTimeout = useRef(null);

  const updateStatus = async () => {
    const result = await checkInternetConnection();
    setIsOnline(result);
    setIsChecking(false);
  };

  useEffect(() => {
    updateStatus(); // Verifica na primeira montagem

    const handleOnline = () => {
      if (checkTimeout.current) clearTimeout(checkTimeout.current);
      checkTimeout.current = setTimeout(updateStatus, 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (checkTimeout.current) clearTimeout(checkTimeout.current);
    };
  }, []);

  return (
    <AuthGuard>
      {!isChecking && !isOnline && (
        <Box sx={{ marginTop: '70px' }}>
          <Alert variant="filled" severity="error">
            {'Você está sem internet. Verifique sua conexão antes de continuar.'}
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
