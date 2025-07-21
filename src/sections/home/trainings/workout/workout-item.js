import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import TextMaxLine from 'src/components/text-max-line';
import useTraining from 'src/hooks/use-training';

export default function WorkoutItem({
  media,
  exerciseInfo,
  isWorkoutLoad,
  checkList,
  handleCheckList,
}) {
  const { onSaveWorkoutLoad, onGetWorkoutLoad, workoutLoad } = useTraining();
  const exerciseInfoById = exerciseInfo?.filter(
    (item) => item.id === media.id || item.mediaId === media.id,
  )[0];

  const [isEditing, setIsEditing] = useState(false);
  const [carga, setCarga] = useState(null);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCargaChange = (event) => {
    setCarga(event.target.value);
  };

  const handleSaveLoad = useCallback(async () => {
    try {
      await onSaveWorkoutLoad(media.id, carga);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }, [media.id, carga]);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/|\/shorts\/)([\w-]{11})/);
    return match ? match[1] : null;
  };
  const initialize = useCallback(async () => {
    try {
      onGetWorkoutLoad(media.id);
    } catch (error) {
      console.error(error);
    }
  }, [isWorkoutLoad]);

  useEffect(() => {
    if (isWorkoutLoad) {
      initialize();
    }
  }, [initialize]);

  useEffect(() => {
    if (workoutLoad?.length > 0) {
      if (workoutLoad[0].media_id === media.id) {
        setCarga(workoutLoad[0].load);
      }
    }
  }, [workoutLoad, exerciseInfoById]);
  return (
    <Paper
      sx={{
        mr: 0,
        borderRadius: 2,
        position: 'relative',
        bgcolor: 'background.neutral',
        ...(media?.id &&
          checkList.includes(media.id) && {
            border: (theme) => theme.palette.primary.main,
            borderStyle: 'dashed',
          }),
      }}
    >
      <Stack
        spacing={2}
        sx={{
          px: 2,
          pb: 1,
          pt: 2.5,
        }}
      >
        <TextMaxLine variant="subtitle2" line={2}>
          {media.title}
        </TextMaxLine>
        <iframe
          src={`https://www.youtube.com/embed/${getYoutubeId(
            media.videoUrl,
          )}?controls=0&disablekb=1&modestbranding=1&rel=0&fs=0&vq=hd720&hd=1`}
          style={{
            width: '100%',
            height: '400px', // Altura fixa maior
            borderRadius: 12,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={media.title}
        />
        {isWorkoutLoad && (
          <Stack>
            <Alert
              variant="outlined"
              severity="info"
              icon={false}
              action={
                <>
                  {!isEditing ? (
                    <Button color="inherit" size="small" onClick={handleEditClick}>
                      Editar
                    </Button>
                  ) : (
                    <Button color="inherit" size="small" onClick={handleSaveLoad}>
                      Salvar
                    </Button>
                  )}
                </>
              }
            >
              <Stack direction="column" spacing={1}>
                <Stack>
                  {isEditing ? (
                    <TextField
                      value={carga}
                      onChange={handleCargaChange}
                      size="small"
                      placeholder="Digita a carga"
                    />
                  ) : (
                    <>
                      <AlertTitle>
                        <Stack direction="row" spacing={1}>
                          <Typography> Carga: </Typography>
                          <Typography fontWeight={'bold'}>{carga}</Typography>
                        </Stack>
                      </AlertTitle>
                      {!carga && <>Clique em editar para definir a carga</>}
                    </>
                  )}
                </Stack>
              </Stack>
            </Alert>
          </Stack>
        )}

        <Stack flexDirection={'row'}>
          <Stack spacing={1}>
            {exerciseInfoById?.method && exerciseInfoById?.method.length > 0 && (
              <Stack>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                  }}
                >
                  MÉTODO:
                </Typography>
                <TextMaxLine variant="subtitle2" line={2}>
                  {exerciseInfoById?.method}
                </TextMaxLine>
              </Stack>
            )}
            {exerciseInfoById?.reps && exerciseInfoById?.reps.length > 0 && (
              <Stack>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                  }}
                >
                  RANGE DE REPETIÇÕES:
                </Typography>
                <TextMaxLine variant="subtitle2" line={2}>
                  {exerciseInfoById?.reps}
                </TextMaxLine>
              </Stack>
            )}
            {exerciseInfoById?.reset > 0 && (
              <Stack>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                  }}
                >
                  INTERVALO DE RECUPERAÇÃO:
                </Typography>
                <TextMaxLine variant="subtitle2" line={2}>
                  {exerciseInfoById?.reset}
                </TextMaxLine>
              </Stack>
            )}

            {exerciseInfoById?.rir && exerciseInfoById?.rir.length > 0 && (
              <Stack>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                  }}
                >
                  repetições de reserva
                </Typography>
                <TextMaxLine variant="subtitle2" line={2}>
                  {exerciseInfoById?.rir}
                </TextMaxLine>
              </Stack>
            )}
            {exerciseInfoById?.cadence && exerciseInfoById?.cadence.length > 0 && (
              <Stack>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                  }}
                >
                  Cadência / Vel. de mov.:
                </Typography>
                <TextMaxLine variant="subtitle2" line={2}>
                  {exerciseInfoById?.cadence}
                </TextMaxLine>
              </Stack>
            )}
            {exerciseInfoById?.comments && exerciseInfoById?.comments.length > 0 && (
              <Stack>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                  }}
                >
                  Observações:
                </Typography>
                <TextMaxLine variant="subtitle2" line={2}>
                  {exerciseInfoById?.comments}
                </TextMaxLine>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Box p={2}>
        <Button variant="contained" onClick={() => handleCheckList(media.id)}>
          {!checkList.includes(media.id) ? 'Marcar como feito' : 'Desmarcar como feito'}
        </Button>
      </Box>
    </Paper>
  );
}
