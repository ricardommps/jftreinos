import PrintIcon from '@mui/icons-material/Print';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import useHome from 'src/hooks/use-home';
import { extrapolation } from 'src/utils/extrapolation';

import ProgramPdf from './program-pdf';
export default function PdfView({ open, onClose, programId }) {
  const { viewPdfStatus, viewPdf, onViewPdf } = useHome();
  const [currentExtrapolation, setCurrentExtrapolation] = useState(null);
  const [pdfReady, setpdfReady] = useState(false);

  const getExtrapolationByPv = () => {
    const resultValue = extrapolation[viewPdf.pv];
    setCurrentExtrapolation(resultValue);
    setpdfReady(true);
  };
  useEffect(() => {
    if (viewPdf) {
      if (viewPdf?.type === 2) {
        setpdfReady(true);
        return;
      }
      getExtrapolationByPv();
    }
  }, [viewPdf]);

  useEffect(() => {
    onViewPdf(programId);
  }, []);

  useEffect(() => {
    if (viewPdfStatus.error) {
      enqueueSnackbar('Não foi possível gerar o PDF. Tente novamente mais tarde.', {
        autoHideDuration: 8000,
        variant: 'error',
      });
      onClose();
    }
  }, [viewPdfStatus]);

  const MyDocument = () => {
    return <ProgramPdf program={viewPdf} currentExtrapolation={currentExtrapolation} />;
  };

  const renderPdfGenerate = () => {
    return (
      <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
        <Box
          sx={{
            mt: 1,
            width: 1,
            height: 320,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography>Gerando o pdf do treino</Typography>
          <CircularProgress color="error" />
        </Box>
      </Stack>
    );
  };

  const renderPdfDownload = () => {
    return (
      <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
        <Box
          sx={{
            mt: 1,
            width: 1,
            height: 320,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button variant="contained" endIcon={<PrintIcon />}>
            Baixar PDF
          </Button>
        </Box>
      </Stack>
    );
  };

  return (
    <Dialog fullScreen open={open}>
      <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <DialogActions
          sx={{
            p: 1.5,
          }}
        >
          <Button color="inherit" variant="contained" onClick={onClose}>
            Fechar
          </Button>
        </DialogActions>
        <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
          {viewPdfStatus.loading && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
              <Typography position="absolute" top={100}>
                Gerando PDF...
              </Typography>
            </Box>
          )}
          {viewPdf && !viewPdfStatus.loading && pdfReady && (
            <PDFDownloadLink
              document={<MyDocument />}
              fileName={viewPdf.name}
              style={{ textDecoration: 'none' }}
            >
              {({ loading }) => (loading ? renderPdfGenerate() : renderPdfDownload())}
            </PDFDownloadLink>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
