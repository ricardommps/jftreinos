import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DistanceSelect from 'src/components/distance-select';
import { RHFRadioGroup, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import TimeSelect from 'src/components/time-select';
import useWorkout from 'src/hooks/use-workout';
import { convertPaceToSpeed } from 'src/utils/convertValues';
import { convertDate } from 'src/utils/format-time';
import * as Yup from 'yup';

import MetricsForm from './forms/metrics-form';
import RPSSlider from './rpe-slider';

export const OPTIONS = [
  { label: 'Pace', value: 'pace' },
  { label: 'Km/h', value: 'km' },
];

export default function FinishTrainingFormVs2({
  workoutId,
  onClose,
  typeTrainingSelected,
  name,
  unrealizedTraining,
}) {
  const theme = useTheme();
  const { onFinishedWorkout } = useWorkout();

  const NewTrainingSchema = Yup.object().shape({
    executionDay: Yup.string().required('Data de realização do treino obrigatório'),
    distanceInMeters: Yup.number()
      .required('Campo distância obrigatório')
      .min(1, 'A distância deve ser maior que 0'),

    durationInSeconds: Yup.number()
      .required('Campo tempo total obrigatório')
      .min(1, 'O tempo deve ser maior que 0'),

    rpe: Yup.number().required('Campo rpe obrigatório').min(1, 'O RPE deve ser maior que 0'), // Opcional: Validação para RPE também ser maior que zero
  });

  const [openDistanceSelect, setOpenDistanceSelect] = useState(false);
  const [openTimeSelect, setOpenTimeSelect] = useState(false);
  const [openPaceSelect, setOpenPaceSelect] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultValues = useMemo(
    () => ({
      distance: '',
      duration: '',
      pace: '',
      rpe: 0,
      trimp: 0,
      link: '',
      comments: '',
      workoutId,
      unitmeasurement: typeTrainingSelected === 'indoor' ? OPTIONS[0].value : null,
      intensities: [{ intensitie: 0 }],
      typetraining: typeTrainingSelected,
      quantity: 1,
      distanceInMeters: 0,
      durationInSeconds: 0,
      paceInSeconds: 0,
      executionDay: null,
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
    formState: { errors },
  } = methods;

  const values = watch();

  const getTrimp = () => {
    const durationInSeconds = Number(values.durationInSeconds);
    if (durationInSeconds > 0) {
      const durationInMinutes = durationInSeconds / 60; // Converte segundos para minutos
      const trimp = durationInMinutes * values.rpe; // Calcula TRIMP com base em minutos
      const formattedTrimp = trimp.toFixed(2); // Formata TRIMP para duas casas decimais
      setValue('trimp', formattedTrimp.toString());
      return formattedTrimp;
    }
    return 0;
  };

  const onSubmit = useCallback(async (data) => {
    try {
      const payload = Object.assign({}, data);
      if (payload.intensities) {
        payload.intensities = payload.intensities.filter(
          (item) => item.intensitie !== '' && item.intensitie > 0,
        );
      }
      payload.distanceInMeters = Number(payload.distanceInMeters);
      payload.durationInSeconds = Number(payload.durationInSeconds);
      payload.rpe = Number(payload.rpe);
      payload.workoutId = Number(payload.workoutId);
      payload.paceInSeconds = Number(payload.paceInSeconds);
      payload.distance = undefined;
      payload.duration = undefined;
      payload.executionDay = convertDate(payload.executionDay);
      delete payload.quantity;
      if (unrealizedTraining) {
        payload.unrealized = unrealizedTraining;
      }
      await onFinishedWorkout(payload);
    } catch (error) {
      enqueueSnackbar('Não foi possível executar esta operação. Tente novamente mais tarde.', {
        autoHideDuration: 8000,
        variant: 'error',
      });
      onClose();
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

  const calculateAverage = () => {
    if (values?.intensities?.length > 0) {
      const intensitiesValues = values.intensities.map((intensitie) => intensitie.intensitie);
      const noEmptyValues = intensitiesValues.filter((str) => str !== '' && str > 0);
      const average = noEmptyValues.reduce((p, c) => p + c, 0) / noEmptyValues.length;
      if (isNaN(average)) {
        return 0;
      }
      return Math.floor(average * 100) / 100;
    }
    return 0;
  };

  const handleDistance = (item) => {
    if (item) {
      setValue('distanceInMeters', item);
    }
    setOpenDistanceSelect(false);
  };

  const handleDuration = (item) => {
    if (item) {
      setValue('durationInSeconds', item);
    }
    setOpenTimeSelect(false);
  };

  const handlePace = (item) => {
    if (item) {
      setValue('paceInSeconds', item);
    }
    setOpenPaceSelect(false);
  };

  const updateIntensitiesItems = () => {
    const newIntensities = [];
    for (var i = 0; i < values.quantity; i++) {
      newIntensities.push({
        intensitie: 0,
      });
    }
    setValue('intensities', [...newIntensities]);
  };

  const enableIntensities =
    name === 'HIIT_CURTO' ||
    name === 'HIITT_LONGO' ||
    name === 'LL2_INTERVALADO' ||
    name === 'SPRINT' ||
    name === 'HIT_ELEVACAO';

  useEffect(() => {
    getTrimp();
  }, [values.duration, values.rpe]);

  useEffect(() => {
    updateIntensitiesItems();
  }, [values.quantity]);

  return (
    <>
      <Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <>
            <Box>
              <Controller
                name="executionDay"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="pt-br"
                    localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                  >
                    <DatePicker
                      label="Data de realização do treino."
                      value={field?.value ? dayjs(field.value) : null}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                        },
                        actionBar: {
                          actions: ['clear', 'cancel', 'accept'],
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Box>

            <Box rowGap={3} columnGap={2} display="grid" pt={2}>
              <Typography>Métricas do treino</Typography>
              <MetricsForm
                setOpenDistanceSelect={setOpenDistanceSelect}
                setOpenTimeSelect={setOpenTimeSelect}
              />
              {typeTrainingSelected === 'outdoor' && (
                <>
                  <RHFTextField
                    InputProps={{
                      readOnly: true, // Faz com que o campo seja apenas leitura
                    }}
                    name="pace"
                    label="Pace médio da sessão"
                    variant="outlined"
                    onClick={() => setOpenPaceSelect(true)}
                    value={convertPaceToSpeed(values.paceInSeconds)}
                    inputProps={{
                      min: 0,
                      max: 1000,
                      step: 0.01,
                      lang: 'en-US',
                      inputMode: 'number',
                    }}
                  />
                </>
              )}

              {typeTrainingSelected === 'indoor' && enableIntensities && (
                <Box>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="subtitle1">Intensidade dos esforços</Typography>
                    <Stack pt={2}>
                      <RHFTextField
                        size="small"
                        type="number"
                        name="quantity"
                        label="Quantidade de esforços"
                        InputLabelProps={{ shrink: true }}
                        sx={{ maxWidth: { md: 96 } }}
                        inputProps={{
                          min: 0,
                          max: 1000,
                          step: 1,
                          inputMode: 'number',
                        }}
                      />
                    </Stack>
                    <Stack spacing={1} pt={2}>
                      <Typography variant="subtitle2">Selecione a unidade de medida</Typography>
                      <RHFRadioGroup row name="unitmeasurement" spacing={2} options={OPTIONS} />
                    </Stack>
                    <Stack pt={2}>
                      <Stack sx={{ backgroundColor: theme.palette.warning.light }} mb={2} p={1}>
                        <Typography variant="subtitle2" color={theme.palette.grey[900]}>
                          Clique nas caixas para adicionar o valor desejado
                        </Typography>
                      </Stack>
                      <Grid
                        container
                        spacing={3}
                        justifyContent={{
                          xs: 'center',
                          md: 'space-between',
                        }}
                      >
                        {values.intensities.map((_, index) => (
                          <Grid sm={3} key={`intensities-badge-key-${index}`}>
                            <Badge badgeContent={index + 1} color="info">
                              <Box
                                sx={{
                                  color: 'rgb(33, 43, 54)',
                                  backgroundColor: 'white',
                                  boxSizing: 'border-box',
                                  display: 'inline-flex',
                                  borderRadius: '8px',
                                  maxWidth: '100%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  whiteSpace: 'nowrap',
                                  verticalAlign: 'middle',
                                  width: '100px',
                                }}
                              >
                                <RHFTextField
                                  sx={{
                                    input: {
                                      color: 'rgb(33, 43, 54)',
                                    },
                                  }}
                                  hiddenLabel
                                  size="small"
                                  variant="filled"
                                  name={`intensities[${index}].intensitie`}
                                  type="number"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="start" sx={{ fontSize: '12px' }}>
                                        <Typography
                                          sx={{ fontSize: '12px', fontWeight: 'bold' }}
                                        >{`${
                                          values.unitmeasurement === 'pace' ? 'min' : 'km/h'
                                        }`}</Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                  inputProps={{
                                    min: 0,
                                    max: 1000,
                                    step: 0.01,
                                    lang: 'en-US',
                                    inputMode: 'number',
                                  }}
                                />
                              </Box>
                            </Badge>
                          </Grid>
                        ))}
                      </Grid>
                    </Stack>
                    <Stack>
                      <Typography sx={{ textTransform: 'capitalize', m: 1 }}>{`${
                        values.unitmeasurement
                      } medio : ${calculateAverage()}`}</Typography>
                    </Stack>
                  </Paper>
                </Box>
              )}

              <RHFTextField name="link" label="Link" variant="outlined" />
              <RPSSlider control={control} />
              <Stack>
                <Typography>{`Trimp: ${values.trimp}`}</Typography>
              </Stack>
              <RHFTextField
                name="comments"
                label="Comentários"
                multiline
                rows={6}
                variant="outlined"
                sx={{ pb: 2 }}
              />
            </Box>
            <Stack pt={2} sx={{ width: '100%' }} spacing={2}>
              {renderErros}
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }} spacing={2}>
              <LoadingButton type="submit" variant="contained" loading={loading} fullWidth>
                Salvar
              </LoadingButton>
              <Button
                fullWidth
                variant="outlined"
                color="warning"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
            </Stack>
          </>
        </FormProvider>
      </Stack>
      {openDistanceSelect && (
        <DistanceSelect
          visible={openDistanceSelect}
          onClose={() => setOpenDistanceSelect(false)}
          onSave={handleDistance}
          initialValue={values.distanceInMeters}
          title={'Selecione a distância percorrida (km)'}
        />
      )}

      {openTimeSelect && (
        <TimeSelect
          visible={openTimeSelect}
          onClose={() => setOpenTimeSelect(false)}
          onSave={handleDuration}
          initialValue={values.durationInSeconds}
        />
      )}

      {openPaceSelect && (
        <DistanceSelect
          visible={openPaceSelect}
          onClose={() => setOpenPaceSelect(false)}
          onSave={handlePace}
          initialValue={values.paceInSeconds}
          title={'Selecione o pace médio da sessão (km)'}
        />
      )}
    </>
  );
}

// label={`${0} ${values.unitmeasurement === 'pace' ? 'min' : 'km/h'}`}

// label={`${values.unitmeasurement === 'pace' ? 'min' : 'km/h'}`}
