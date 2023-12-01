import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { fDateCalender } from 'src/utils/format-time';
import { getModuleName } from 'src/utils/modules';

import RenderVideos from '../render-videos';

export default function CalendarDetails({ event, onClose, handleOpenFinishedTraining }) {
  return (
    <>
      <DialogTitle>{getModuleName(event.title)}</DialogTitle>
      <Stack spacing={3} sx={{ px: 3, mb: 2 }}>
        <Stack sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Data do treino
          </Typography>
          <Typography variant="subtitle1">{fDateCalender(event.start)}</Typography>
          {event.trainingDateOther && (
            <>
              <Typography variant="subtitle2" sx={{ mb: 0 }}>
                ou
              </Typography>
              <Typography variant="subtitle1">{fDateCalender(event.trainingDateOther)}</Typography>
            </>
          )}
        </Stack>
      </Stack>

      <Stack spacing={3} sx={{ px: 3 }}>
        <TextField
          id="outlined-multiline-static"
          label="Descrição"
          multiline
          rows={15}
          value={event.description}
          disabled
        />
      </Stack>
      {event.videos.length > 0 && <RenderVideos videos={event.videos} />}
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="contained" color="inherit" onClick={handleOpenFinishedTraining}>
          Finalizar treino
        </Button>
      </DialogActions>
    </>
  );
}
