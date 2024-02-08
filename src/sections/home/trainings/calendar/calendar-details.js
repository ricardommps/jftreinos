import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardHeader from 'src/components/card-header/card-header';
import { useBoolean } from 'src/hooks/use-boolean';
import { fDateCalender } from 'src/utils/format-time';
import { getModuleName } from 'src/utils/modules';

import DialogTablePaceSpeed from '../../dialog-table-pace-speed/dialog-table-pace-speed';
import GymList from '../gym/gym-list';
import RenderVideos from '../render-videos';

export default function CalendarDetails({
  event,
  onClose,
  handleOpenFinishedTraining,
  type,
  setUnrealizedTraining,
}) {
  const openTable = useBoolean();

  const renderTite = (
    <Stack>
      <Typography variant="h6">{getModuleName(event.title)}</Typography>
      <Typography variant="body1">{getModuleName(event.subtitle)}</Typography>
    </Stack>
  );
  return (
    <>
      <CardHeader title={renderTite} action={onClose} onOpenTable={openTable.onTrue} />
      <Box mt={12}>
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
                <Typography variant="subtitle1">
                  {fDateCalender(event.trainingDateOther)}
                </Typography>
              </>
            )}
          </Stack>
        </Stack>
        {false && (
          <>
            {type === 2 || event.name === 'FORCA' ? (
              <GymList />
            ) : (
              <>
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
              </>
            )}
          </>
        )}
        <Stack spacing={3} sx={{ px: 3 }}>
          <TextField
            id="outlined-multiline-static"
            label="Descrição"
            multiline
            rows={15}
            value={event.description}
            disabled
          />
          {event.videos.length > 0 && <RenderVideos videos={event.videos} />}
        </Stack>
        <Stack p={3}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setUnrealizedTraining(true)}
            fullWidth
          >
            Treino não realizado
          </Button>
        </Stack>
      </Box>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="contained" color="inherit" onClick={handleOpenFinishedTraining}>
          Finalizar treino
        </Button>
      </DialogActions>
      {openTable.value && (
        <DialogTablePaceSpeed open={openTable.value} onClose={openTable.onFalse} />
      )}
    </>
  );
}
