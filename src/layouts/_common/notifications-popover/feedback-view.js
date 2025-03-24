import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { useCallback, useEffect, useState } from 'react';
import useFinished from 'src/hooks/use-finished';
import HistoryItem from 'src/sections/workout/history/history-item';

export default function FeedBackView({ id, open, onClose }) {
  const { onGetFinished, finished } = useFinished();

  const [loading, setLoading] = useState(false);

  const initialize = useCallback(async () => {
    await onGetFinished(id);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    initialize();
  }, [initialize, id]);

  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        {loading && !finished && (
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
        {finished && finished?.length > 0 && (
          <Box>
            <HistoryItem
              historyItem={finished[0]}
              workoutInfo={finished[0].type == 1 ? true : false}
            />
          </Box>
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
