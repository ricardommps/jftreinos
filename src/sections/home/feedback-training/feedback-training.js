import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
import useHome from 'src/hooks/use-home';
export default function FeedbackTraining({ open, onClose, finishedItem }) {
  const { onViewedFeedBack, viewedSuccess, viewedError } = useHome();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    onViewedFeedBack(finishedItem.feedbackid);
  }, []);

  useEffect(() => {
    if (viewedSuccess) {
      setLoading(false);
    }
  }, [viewedSuccess]);

  useEffect(() => {
    if (viewedError) {
      setLoading(false);
      enqueueSnackbar('Não foi possível carregar o feedback. Tente novamente', {
        autoHideDuration: 8000,
        variant: 'error',
      });
    }
  }, [viewedError]);
  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        {loading && !viewedSuccess && (
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
              <CircularProgress color="error" />
            </Box>
          </Stack>
        )}
        {viewedSuccess && (
          <>
            <Stack spacing={2}>
              <Typography variant="h6">{finishedItem.description_feedback}</Typography>
            </Stack>
            {finishedItem.fed_paces && (
              <>
                <Divider sx={{ py: 2 }} />
                <Stack spacing={2} pt={2}>
                  <Typography variant="h6">Paces</Typography>
                  {finishedItem.fed_paces.map((pace, index) => (
                    <Stack key={`paces-${index}`} spacing={1} direction="row" alignItems="center">
                      <Iconify
                        icon="eva:checkmark-circle-2-outline"
                        sx={{
                          color: 'primary.main',
                        }}
                      />
                      {pace}
                    </Stack>
                  ))}
                </Stack>
              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
