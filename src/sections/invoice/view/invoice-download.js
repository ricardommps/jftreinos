'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import useInvoice from 'src/hooks/use-invoice';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

import AutoDownloadPDF from '../pdf/auto-download-pdf';

export default function InvoiceDownload() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { invoice, onGetInvoice } = useInvoice();
  const { user } = useAuthContext();
  const downloadRef = useRef(null);

  const handleGoBack = () => {
    router.push(paths.dashboard.home.root);
  };
  const initialize = useCallback(async () => {
    try {
      await onGetInvoice(id);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    initialize();
  }, [initialize, id]);

  useEffect(() => {
    if (invoice && downloadRef.current && user) {
      downloadRef.current.click(); // Simula o clique para iniciar o download
    }
  }, [invoice]);

  return (
    <>
      <Container maxWidth="lg">
        <Stack
          sx={{ height: '100vh' }} // Ocupa toda a altura da tela
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" align="center">
              Baixando comprovante
            </Typography>
            {invoice && user && (
              <AutoDownloadPDF invoice={invoice} customer={user} handleGoBack={handleGoBack} />
            )}
          </Box>
        </Stack>
      </Container>
    </>
  );
}
