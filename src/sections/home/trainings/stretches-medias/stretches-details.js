import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player/youtube';
export default function StretchesDetails({ open, onClose, media, exerciseInfo }) {
  const exerciseInfoById = exerciseInfo?.filter((item) => item.id === media.id)[0];
  return (
    <Dialog fullScreen open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}> {media.title}</DialogTitle>
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
        <Stack spacing={3} sx={{ px: 3 }} alignItems={'center'}>
          <ReactPlayer className="react-player" url={media.videoUrl} width="100%" height={200} />
        </Stack>
        <Card sx={{ py: 3, textAlign: 'center', typography: 'h4', mt: 2 }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          >
            {exerciseInfoById?.reps && (
              <Stack width={1}>
                {exerciseInfoById?.reps}
                <Box
                  component="span"
                  sx={{ color: 'text.secondary', typography: 'body2', width: '98%' }}
                >
                  Range de repetições
                </Box>
              </Stack>
            )}
            {exerciseInfoById?.reset && (
              <Stack width={1}>
                {exerciseInfoById?.reset}
                <Box
                  component="span"
                  sx={{ color: 'text.secondary', typography: 'body2', width: '98%' }}
                >
                  Intervalo de recuperação
                </Box>
              </Stack>
            )}

            {exerciseInfoById?.rir && (
              <Stack width={1}>
                {exerciseInfoById?.rir}
                <Box
                  component="span"
                  sx={{ color: 'text.secondary', typography: 'body2', width: '98%' }}
                >
                  Repetição reserva
                </Box>
              </Stack>
            )}
          </Stack>
        </Card>
        <Stack mt={2}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Instruções</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{media.instrucctions}</Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
