import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
export default function StretchesDetails({ open, onClose, media, exerciseInfo }) {
  const exerciseInfoById = exerciseInfo?.filter((item) => item.id === media.id)[0];
  const [isEditing, setIsEditing] = useState(false);
  const [carga, setCarga] = useState('10kg');

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCargaChange = (event) => {
    setCarga(event.target.value);
  };

  const renderNewInfo = () => (
    <>
      <Stack
        direction="column"
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        {exerciseInfoById?.method && exerciseInfoById?.method.length > 0 && (
          <Stack width={1}>
            {exerciseInfoById?.method}
            <Box
              component="span"
              sx={{ color: 'text.secondary', typography: 'caption', width: '98%' }}
            >
              <Typography
                sx={{ fontSize: '0.75rem', textTransform: 'capitalize', color: 'text.secondary' }}
              >
                Método
              </Typography>
            </Box>
          </Stack>
        )}

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
        >
          {exerciseInfoById?.reps && exerciseInfoById?.reps.length > 0 && (
            <Stack width={1}>
              {exerciseInfoById?.reps}
              <Box
                component="span"
                sx={{ color: 'text.secondary', typography: 'caption', width: '98%' }}
              >
                <Typography
                  sx={{ fontSize: '0.75rem', textTransform: 'capitalize', color: 'text.secondary' }}
                >
                  Range de repetições
                </Typography>
              </Box>
            </Stack>
          )}
          {exerciseInfoById?.reset && exerciseInfoById?.reset > 0 && (
            <Stack width={1}>
              {exerciseInfoById?.reset}
              <Box
                component="span"
                sx={{ color: 'text.secondary', typography: 'caption', width: '98%' }}
              >
                Intervalo de recuperação
              </Box>
            </Stack>
          )}
          {exerciseInfoById?.rir && exerciseInfoById?.rir.length > 0 && (
            <Stack width={1}>
              {exerciseInfoById?.rir}
              <Box
                component="span"
                sx={{ color: 'text.secondary', typography: 'caption', width: '98%' }}
              >
                Repetições de reserva
              </Box>
            </Stack>
          )}
        </Stack>
        {exerciseInfoById?.cadence && exerciseInfoById?.cadence.length > 0 && (
          <Stack width={1}>
            {exerciseInfoById?.cadence}
            <Box
              component="span"
              sx={{ color: 'text.secondary', typography: 'caption', width: '98%' }}
            >
              Cadência / Velocidade de movimento
            </Box>
          </Stack>
        )}
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Stack width={1} alignItems="center">
            {isEditing ? (
              <TextField
                value={carga}
                onChange={handleCargaChange}
                size="small"
                sx={{ width: '100px' }}
              />
            ) : (
              <Stack justifyContent="center" alignItems="center" ml={5}>
                {carga}
                <Box
                  component="span"
                  sx={{
                    color: 'text.secondary',
                    typography: 'caption',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  Carga
                </Box>
              </Stack>
            )}
          </Stack>
          <IconButton onClick={handleEditClick} sx={{ '& svg': { width: 20, height: 20 } }}>
            {isEditing ? <CheckIcon /> : <EditIcon />}
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
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
        <Card sx={{ py: 3, textAlign: 'center', typography: 'h4', mt: 2 }}>{renderNewInfo()}</Card>
        {/* <Stack mt={2}>
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
        </Stack> */}
      </DialogContent>
    </Dialog>
  );
}
