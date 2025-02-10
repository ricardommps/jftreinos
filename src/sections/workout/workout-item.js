// @mui
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import Label from 'src/components/label';
import TextMaxLine from 'src/components/text-max-line';
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';
import { getModuleName } from 'src/utils/training-modules';

import History from './history/history';

// components
// utils

export default function WorkoutItem({ workout, hideHistory }) {
  const theme = useTheme();
  const router = useRouter();
  const history = useBoolean();
  const opacityCard = () => {
    return 1;
  };

  const handleOpenWorkout = useCallback(
    (id) => {
      router.push(paths.dashboard.workout.root(id));
    },
    [router],
  );

  const statusTraining = () => {
    if (workout.finished) {
      return (
        <Label variant="soft" color={'success'}>
          Treino finalizado
        </Label>
      );
    }

    if (!workout.finished) {
      return (
        <Label variant="soft" color={'warning'}>
          Aguardando realização do treino
        </Label>
      );
    }
  };

  return (
    <>
      <Stack component={Card} direction="row" sx={{ opacity: opacityCard(), mb: 2 }}>
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
            width: '100%',
          }}
        >
          <Stack direction="row" spacing={3}>
            <Stack flex={1}>
              {workout.running && (
                <TextMaxLine variant="subtitle1" line={1}>
                  {getModuleName(workout.name)}
                </TextMaxLine>
              )}
              <TextMaxLine variant="subtitle2" line={1}>
                {workout.subtitle}
              </TextMaxLine>
              {workout.workoutDateOther && (
                <TextMaxLine variant="subtitle2" line={1} sx={{ pt: 2 }}>
                  {`Dia alternativo: ${fDate(workout.workoutDateOther, 'dd/MM/yyyy')}`}
                </TextMaxLine>
              )}

              {workout?.history.length > 0 && (
                <Typography
                  variant="subtitle2"
                  sx={{ paddingTop: 3 }}
                  color={theme.palette.info.main}
                >
                  {workout?.running ? (
                    <>
                      {`Treino concluído em : ${fDate(
                        workout?.history[0].executionDay,
                        'dd/MM/yyyy',
                      )}`}
                    </>
                  ) : (
                    <>
                      {`Último treino concluído em : ${fDate(
                        workout?.history[0].executionDay,
                        'dd/MM/yyyy',
                      )}`}
                    </>
                  )}
                </Typography>
              )}
              {workout?.running && <Box pt={2}>{statusTraining()}</Box>}
            </Stack>

            {workout.datePublished && (
              <Box component="span" sx={{ typography: 'caption' }}>
                {fDate(workout.datePublished, 'dd/MM/yyyy')}
              </Box>
            )}
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
          <Stack direction="row" alignItems="center" spacing={3}>
            {(!workout.running || workout.finished) && (
              <>
                {workout?.history && !hideHistory ? (
                  <Stack alignItems="flex-start" justifyContent="space-between">
                    <Badge badgeContent={workout.history.length} color="info" showZero>
                      <Button
                        variant="outlined"
                        color="info"
                        startIcon={<AssignmentTurnedInIcon />}
                        onClick={history.onTrue}
                      >
                        Histórico
                      </Button>
                    </Badge>
                  </Stack>
                ) : (
                  <Stack alignItems="flex-start" justifyContent="space-between">
                    <Button
                      variant="outlined"
                      color="info"
                      startIcon={<AssignmentTurnedInIcon />}
                      onClick={history.onTrue}
                    >
                      Histórico
                    </Button>
                  </Stack>
                )}
              </>
            )}

            <Button
              variant="outlined"
              color="info"
              fullWidth
              onClick={() => handleOpenWorkout(workout.id)}
            >
              Ver treino
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {history.value && (
        <History
          open={history.value}
          onClose={history.onFalse}
          history={workout.history}
          title={workout.running ? getModuleName(workout.name) : workout.subtitle}
        />
      )}
    </>
  );
}
