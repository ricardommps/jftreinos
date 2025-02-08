'use client';

import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import LogRocket from 'logrocket';
import { Component } from 'react';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

class ErrorCatcher extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('-DEBUG---Erro capturado:', error, errorInfo);

    // Função assíncrona para lidar com o erro
    const handleError = async () => {
      try {
        await axios.post(`${API_ENDPOINTS.log.root}`, {
          typeLog: 'error',
          errorStr: error.toString(),
          errorMessage: errorInfo,
          errorUrl: window.location.href,
        });
      } catch (err) {
        console.error('Erro ao enviar log para o servidor:', err);
      }

      // Captura a exceção no LogRocket após um pequeno delay
      setTimeout(() => {
        LogRocket.captureException(error, { extra: errorInfo });
      }, 100);
    };

    handleError(); // Chamada da função assíncrona
  }

  handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Caso o histórico de navegação não tenha mais páginas, redireciona para a home
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      // Garantir que a mensagem de erro seja exibida corretamente
      const errorMessage =
        this.state.error?.message || 'Ocorreu um erro inesperado, tente novamente mais tarde.';
      return (
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
            <m.div>
              <Alert variant="filled" severity="error">
                <Typography variant="subtitle1">
                  Ocorreu um erro inesperado. Por favor, tente novamente mais tarde. Feche o
                  aplicativo e abra-o novamente. Caso o erro persista, entre em contato com o
                  administrador.
                </Typography>
              </Alert>
            </m.div>
          </Stack>
        </Container>
      );
    }

    // Renderiza os filhos normalmente se não houver erro
    return this.props.children;
  }
}

export default function ErrorBoundary({ children }) {
  return <ErrorCatcher>{children}</ErrorCatcher>;
}
