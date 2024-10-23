'use client';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import Image from 'src/components/image/image';
import useAnamnese from 'src/hooks/use-anamnese';
import useMyData from 'src/hooks/use-my-data';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

import AnamneseForm from '../anamnese-form';

export default function AnamneseView() {
  const {
    checkEmail,
    onCheckEmail,
    checkEmailStatus,
    onCreateAnamnese,
    onClearAnamneseState,
    anamneseCreateStatus,
    anamneseCreate,
    onLoginAnamnese,
    anamneseLogin,
    anamneseLoginStatus,
  } = useAnamnese();
  const router = useRouter();
  const { myData, onGetMyData } = useMyData();
  const { enqueueSnackbar } = useSnackbar();

  const [nextStep, setNextStep] = useState(false);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [anamneseResponse, setAnamneseResponse] = useState(null);

  const checkEmailExists = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        await onCheckEmail({ email: data.email });
      } catch (error) {
        enqueueSnackbar(error, {
          autoHideDuration: 8000,
          variant: 'error',
        });
      }
    },
    [setIsLoading, onCheckEmail],
  );

  const handleGoBack = () => {
    router.push(paths.dashboard.home.root);
  };

  const onLogin = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const payload = {
          email: data.email,
          password: data.password,
        };
        await onLoginAnamnese(payload);
      } catch (error) {
        setIsLoading(false);
        enqueueSnackbar(error, {
          autoHideDuration: 8000,
          variant: 'error',
        });
      }
    },
    [onLoginAnamnese],
  );

  const onRegister = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        if (anamneseResponse?.accessToken) {
          await onCreateAnamnese(data, anamneseResponse.accessToken, anamneseResponse.customer.id);
        } else {
          await onCreateAnamnese(data);
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
    [setIsLoading, anamneseResponse],
  );

  useEffect(() => {
    if (checkEmailStatus?.error) {
      enqueueSnackbar('Este e-mail não tem permissão.', {
        autoHideDuration: 3000,
        variant: 'error',
      });
      setIsLoading(false);
    }
  }, [checkEmailStatus, setIsLoading]);

  useEffect(() => {
    if (anamneseCreateStatus?.error) {
      enqueueSnackbar('Não foi possível enviar sua anamnese. Tente novamente mais tarde.', {
        autoHideDuration: 3000,
        variant: 'error',
      });
      setIsLoading(false);
    }
  }, [anamneseCreateStatus, setIsLoading]);

  useEffect(() => {
    if (checkEmail?.status === 'unregistered_user') {
      setIsLoading(false);
      setNextStep(true);
    }
    if (checkEmail?.status === 'registered_user') {
      setIsLoading(false);
      setShowPassword(true);
    }
  }, [checkEmail]);

  useEffect(() => {
    if (anamneseCreate) {
      setIsLoading(false);
    }
  }, [anamneseCreate]);

  useEffect(() => {
    if (anamneseLogin) {
      setIsLoading(false);
      setNextStep(true);
      setShowPassword(false);
      setAnamneseResponse(anamneseLogin);
    }
  }, [anamneseLogin]);

  useEffect(() => {
    if (anamneseLoginStatus.error) {
      enqueueSnackbar(anamneseLoginStatus.error, {
        autoHideDuration: 3000,
        variant: 'error',
      });
      setIsLoading(false);
    }
  }, [anamneseLoginStatus]);

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

  useEffect(() => {
    onGetMyData();
    onClearAnamneseState();
  }, []);

  const renderHead = (
    <Stack p={4}>
      <Stack alignItems="center">
        <Image
          disabledEffect
          alt={'home'}
          src={`/assets/logo/joana.png`}
          style={{ width: 80, height: 'auto' }}
        />
      </Stack>
    </Stack>
  );

  return (
    <>
      {myData?.id && (
        <Stack spacing={1} direction="row" pt={3} pl={3}>
          <Button
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            onClick={handleGoBack}
          >
            Voltar
          </Button>
        </Stack>
      )}

      {!isOnline && (
        <Box sx={{ marginTop: '10px' }}>
          <Alert variant="filled" severity="error">
            {'Você está sem internet. Verifique sua conexão antes de continuar'}
          </Alert>
        </Box>
      )}
      <Stack spacing={1} p={2}>
        {renderHead}
        <Stack alignItems="center">
          <Typography variant="h2">Anamnese</Typography>
        </Stack>
        {!anamneseCreate ? (
          <AnamneseForm
            email={myData?.email}
            customer={anamneseResponse?.customer}
            anamnese={
              anamneseResponse?.customer?.anamneses?.length > 0
                ? anamneseResponse?.customer?.anamneses[0]
                : null
            }
            nextStep={nextStep}
            isLoading={isLoading}
            checkEmailExists={checkEmailExists}
            onRegister={onRegister}
            showPassword={showPassword}
            onLogin={onLogin}
          />
        ) : (
          <Box>
            <Typography>
              Sua anamnese foi recebida com sucesso! Logo você receberá o acesso à plataforma e aos
              seus treinos!
            </Typography>
          </Box>
        )}
      </Stack>
    </>
  );
}
