import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import TextMaxLine from 'src/components/text-max-line';
import useTraining from 'src/hooks/use-training';
export default function WorkoutItemGroup({
  media,
  exerciseInfo,
  index,
  isWorkoutLoad,
  checkList,
  handleCheckList,
}) {
  const { onSaveWorkoutLoad, onGetWorkoutLoad, workoutLoad } = useTraining();
  const exerciseInfoById = exerciseInfo?.filter((item) => item.id === media.id)[0];

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

  const handleError = (e) => {
    console.log(e);
  };
  return (
    <Paper
      sx={{
        mr: 1,
        borderRadius: 2,
        position: 'relative',
        bgcolor: 'background.neutral',
        ...(exerciseInfoById?.id &&
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
        <Stack flexDirection={'row'} spacing={2}>
          <Stack
            justifyContent={'center'}
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              padding: '0px 6px',
              borderRadius: '15px',
              height: '20px',
            }}
          >
            <Typography>{index}</Typography>
          </Stack>

          <TextMaxLine variant="subtitle2" line={2}>
            {media.title}
          </TextMaxLine>
        </Stack>
        <ReactPlayer
          className="react-player"
          url={media.videoUrl}
          width="100%"
          height={200}
          light={media.thumbnail}
          onError={(e) => handleError(e)}
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
      </Stack>
      <Stack flexDirection={'row'}>
        <Stack spacing={1} p={2}>
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
      <Box p={2}>
        <Button variant="contained" onClick={() => handleCheckList(media.id)}>
          {!checkList.includes(media.id) ? 'Marcar como feito' : 'Desmarcar como feito'}
        </Button>
      </Box>
    </Paper>
  );
}
