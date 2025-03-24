'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// auth
import { AuthGuard } from 'src/auth/guard';
// components
import DashboardLayout from 'src/layouts/dashboard';

// Função para verificar conexão real com um servidor confiável
const checkInternetConnection = async () => {
  try {
    const response = await fetch('https://1.1.1.1/cdn-cgi/trace', { method: 'GET' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export default function Layout({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isChecking, setIsChecking] = useState(true); // Estado para evitar piscada do alerta

  useEffect(() => {
    const updateOnlineStatus = async () => {
      const online = await checkInternetConnection();
      setIsOnline(online);
      setIsChecking(false); // Primeira verificação concluída
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const interval = setInterval(updateOnlineStatus, 5000);

    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
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
