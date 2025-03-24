import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import {
  convertMetersToKilometersFormat,
  convertPaceToSpeed,
  convertSecondsToHourMinuteFormat,
} from 'src/utils/convertValues';
import { fDate } from 'src/utils/format-time';
import { getModuleName } from 'src/utils/modules';

export default function HistoryItem({ historyItem, workoutInfo }) {
  const theme = useTheme();
  const router = useRouter();
  const opacityCard = () => {
    return 1;
  };

  const handleOpenWorkout = useCallback(
    (id) => {
      const url = paths.dashboard.workout.root(id, true);
      router.push(url); // Usando a URL gerada pela função workout.root
    },
    [router],
  );

  const rederFeedback = () => {
    if (!historyItem.review) {
      return (
        <Typography variant="caption" color={theme.palette.warning.main}>
          Aguardando revisão
        </Typography>
      );
    }
    if (historyItem.review && historyItem.feedback.length === 0) {
      return (
        <Typography variant="caption" color={theme.palette.success.main}>
          Feedback : -
        </Typography>
      );
    }
    if (historyItem.review && historyItem.feedback.length > 0) {
      return (
        <Typography
          variant="caption"
          color={theme.palette.success.main}
        >{`Feedback : ${historyItem.feedback}`}</Typography>
      );
    }
  };

  return (
    <Stack component={Card} direction="row" sx={{ opacity: opacityCard(), mb: 2 }}>
      <Stack
        sx={{
          p: 2,
          width: '100%',
        }}
      >
        {workoutInfo && (
          <Stack spacing={2}>
            <ListItemText
              primary={
                <Stack spacing={1} direction="row" alignItems="center" sx={{ typography: 'h6' }}>
                  {getModuleName(historyItem.trainingname)}
                </Stack>
              }
              secondary={historyItem.trainingsubtitle}
              primaryTypographyProps={{ typography: 'subtitle1' }}
              secondaryTypographyProps={{ typography: 'subtitle2' }}
            />
          </Stack>
        )}
        <Stack spacing={2}>
          <Typography variant="subtitle1" color={theme.palette.info.main}>
            {fDate(historyItem.executionDay, 'EEEE, dd/MM/yyyy')}
          </Typography>
          {historyItem.unrealized && (
            <Label variant="soft" color={'error'}>
              Treino não realizado
            </Label>
          )}
          {historyItem.comments.length === 0 ? (
            <Typography variant="caption">Você não deixou comentário</Typography>
          ) : (
            <Typography variant="caption">{`Seu comentário: ${historyItem.comments}`}</Typography>
          )}
          {rederFeedback()}
          <Stack direction="row" spacing={3} flexWrap={'wrap'}>
            {historyItem.distanceInMeters && (
              <Stack direction="row" alignItems="center">
                <Iconify icon="game-icons:path-distance" width={20} sx={{ mr: 0.5 }} />
                {convertMetersToKilometersFormat(historyItem.distanceInMeters, true)}
              </Stack>
            )}
            {historyItem.durationInSeconds && (
              <Stack direction="row" alignItems="center">
                <Iconify icon="material-symbols:timer-outline" width={20} sx={{ mr: 0.5 }} />
                {convertSecondsToHourMinuteFormat(historyItem.durationInSeconds)}
              </Stack>
            )}

            {historyItem.paceInSeconds && Number(historyItem.paceInSeconds) > 0 && (
              <Stack direction="row" alignItems="center">
                <Iconify icon="material-symbols:speed-outline" width={20} sx={{ mr: 0.5 }} />
                {convertPaceToSpeed(historyItem.paceInSeconds, true)}
              </Stack>
            )}

            {historyItem.rpe > 0 && (
              <Stack direction="row" alignItems="center">
                <Iconify icon="fluent:emoji-16-regular" width={20} sx={{ mr: 0.5 }} />
                {historyItem.rpe}
              </Stack>
            )}
          </Stack>
        </Stack>
        {historyItem.typetraining ? (
          <>
            {historyItem.typetraining === 'outdoor' && (
              <Typography variant="caption" sx={{ pt: 2 }}>
                Treino Outdoor
              </Typography>
            )}
            {historyItem.typetraining === 'indoor' && (
              <Typography variant="caption" sx={{ pt: 2 }}>
                Treino Indoor
              </Typography>
            )}
          </>
        ) : (
          <>
            {(!historyItem.type || historyItem.type === 1) && (
              <>
                {historyItem.outdoor ? (
                  <Typography variant="caption" sx={{ pt: 2 }}>
                    Treino Outdoor
                  </Typography>
                ) : (
                  <Typography variant="caption" sx={{ pt: 2 }}>
                    Treino Indoor
                  </Typography>
                )}
              </>
            )}
          </>
        )}

        {false && (
          <Button
            variant="outlined"
            color="info"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={() =>
              handleOpenWorkout(
                historyItem.trainingid ? historyItem.trainingid : historyItem.workoutId,
              )
            }
          >
            Ver treino
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
