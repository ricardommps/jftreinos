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
export default function GymDetails({ open, onClose }) {
  return (
    <Dialog fullScreen open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}> Atividade 1</DialogTitle>
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
          <ReactPlayer
            className="react-player"
            url={'https://www.youtube.com/shorts/Kk9cv2ELP-M'}
            width="100%"
            height={200}
          />
        </Stack>
        <Card sx={{ py: 3, textAlign: 'center', typography: 'h4', mt: 2 }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          >
            <Stack width={1}>
              20kg
              <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
                Carga
              </Box>
            </Stack>

            <Stack width={1}>
              12 - 15
              <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
                Repetição
              </Box>
            </Stack>
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
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
