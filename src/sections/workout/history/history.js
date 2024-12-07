import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import HistoryItem from './history-item';
export default function History({ open, onClose, history, title }) {
  const sortedItems = [...history].sort(
    (a, b) => new Date(b.executionDay) - new Date(a.executionDay),
  );

  return (
    <Dialog fullScreen open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}> Histórico</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <Box pb={2}>
          <Typography variant="body1">{title}</Typography>
        </Box>
        {sortedItems.length && (
          <>
            {sortedItems.map((item) => (
              <HistoryItem historyItem={item} key={item.id} />
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
