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
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RHFRadioGroup, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import useHome from 'src/hooks/use-home';
import * as Yup from 'yup';

import MetricsForm from './forms/metrics-form';
import RPSSlider from './rpe-slider';

export const OPTIONS = [
  { label: 'Pace', value: 'pace' },
  { label: 'Km/h', value: 'km' },
];

export default function FinishTrainingForm({ trainingId, onClose, typeTrainingSelected, name }) {
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
      unitmeasurement: typeTrainingSelected === 'indoor' ? OPTIONS[0].value : null,
      intensities: [{ intensitie: 0 }],
      typetraining: typeTrainingSelected,
      quantity: 1,
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
      if (payload.intensities) {
        payload.intensities = payload.intensities.filter(
          (item) => item.intensitie !== '' && item.intensitie > 0,
        );
      }
      payload.distance = Number(payload.distance);
      payload.duration = Number(payload.duration);
      payload.rpe = Number(payload.rpe);
      payload.trainingId = Number(payload.trainingId);
      payload.pace = String(payload.pace);
      delete payload.quantity;
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

  const handleChangePace = useCallback((event) => {
    const paceValue = event.target.value;
    setValue('pace', paceValue.replace(',', '.'));
  }, []);

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
            <Box rowGap={3} columnGap={2} display="grid" pt={2}>
              <MetricsForm />
              {typeTrainingSelected === 'outdoor' && (
                <>
                  <RHFTextField
                    name="pace"
                    label="Pace médio da sessão"
                    variant="outlined"
                    type="number"
                    helperText={paceInfo}
                    onChange={handleChangePace}
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

// label={`${0} ${values.unitmeasurement === 'pace' ? 'min' : 'km/h'}`}

// label={`${values.unitmeasurement === 'pace' ? 'min' : 'km/h'}`}
