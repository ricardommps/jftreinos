import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import useHome from 'src/hooks/use-home';
import * as Yup from 'yup';

import RPSSlider from './rpe-slider';
export default function FinishTrainingForm({ trainingId, onClose }) {
  const theme = useTheme();
  const { onFinishedTraining, finishedtrainingDetailStatus } = useHome();

  const NewTrainingSchema = Yup.object().shape({
    distance: Yup.string().required('Campo distância obrigatório'),
    duration: Yup.string().required('Campo tempo total obrigatório'),
    rpe: Yup.string().required('Campo rpe obrigatório'),
  });

  const defaultValues = useMemo(
    () => ({
      distance: '',
      duration: '',
      pace: '',
      rpe: 0,
      trimp: 0,
      link: '',
      comments: '',
      trainingId,
    }),
    [],
  );

  const methods = useForm({
    resolver: yupResolver(NewTrainingSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const getTrimp = () => {
    const duration = Number(values.duration);
    if (duration > 0) {
      const trimp = values.duration * values.rpe;
      setValue('trimp', trimp.toString());
      return trimp;
    }
    return 0;
  };

  const onSubmit = useCallback(async (data) => {
    try {
      const payload = Object.assign({}, data);
      payload.distance = Number(payload.distance);
      payload.duration = Number(payload.duration);
      payload.rpe = Number(payload.rpe);
      payload.trainingId = Number(payload.trainingId);
      payload.pace = String(payload.pace);
      onFinishedTraining(payload);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const renderErros = (
    <>
      {errors && (
        <>
          {Object.keys(errors).map((key) => (
            <Alert severity="error" key={key}>
              {errors[key].message}
            </Alert>
          ))}
        </>
      )}
    </>
  );

  const paceInfo = (
    <>
      <Stack flexDirection={'row'}>
        <Typography sx={{ marginRight: 2, color: theme.palette.warning.dark }}>
          Separadores válidos
        </Typography>
        <Typography sx={{ fontWeight: 'bold', marginRight: 1, color: theme.palette.warning.dark }}>
          {' '}
          .
        </Typography>
        <Typography sx={{ fontWeight: 'bold', marginRight: 1, color: theme.palette.warning.dark }}>
          {' '}
          ,
        </Typography>
      </Stack>
    </>
  );

  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }

  useEffect(() => {
    getTrimp();
  }, [values.duration, values.rpe]);

  return (
    <>
      <Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <>
            <Box rowGap={3} columnGap={2} display="grid" pt={2}>
              <RHFTextField
                name="distance"
                label="Distância em metros *"
                variant="outlined"
                type="number"
                helperText={`${Number(values.distance) / 1000} km`}
              />
              <RHFTextField
                name="duration"
                label="Tempo total em minutos *"
                variant="outlined"
                type="number"
                helperText={toHoursAndMinutes(Number(values.duration))}
              />
              <RHFTextField
                name="pace"
                label="Pace médio da sessão"
                variant="outlined"
                type="number"
                helperText={paceInfo}
              />
              <RHFTextField name="link" label="Link" variant="outlined" />
              <RPSSlider control={control} />
              <Stack>
                <Typography>{`Trimp: ${values.trimp}`}</Typography>
              </Stack>
              <RHFTextField name="comments" label="Comentários" multiline rows={6} />
            </Box>
            <Stack pt={2} sx={{ width: '100%' }} spacing={2}>
              {renderErros}
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }} spacing={2}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={finishedtrainingDetailStatus.loading}
                fullWidth
              >
                Salvar
              </LoadingButton>
              <Button
                fullWidth
                variant="outlined"
                color="warning"
                onClick={onClose}
                disabled={finishedtrainingDetailStatus.loading}
              >
                Cancelar
              </Button>
            </Stack>
          </>
        </FormProvider>
      </Stack>
    </>
  );
}
