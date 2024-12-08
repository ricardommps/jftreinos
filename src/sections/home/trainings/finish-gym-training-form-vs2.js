import 'dayjs/locale/pt-br';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import useWorkout from 'src/hooks/use-workout';
import { convertDate } from 'src/utils/format-time';
import * as Yup from 'yup';

import RPSSlider from './rpe-slider';
dayjs.extend(localeData);
dayjs.locale('pt-br');

export default function FinishGymTrainingFormV2({ workoutId, onClose, unrealizedTraining }) {
  const { onFinishedWorkout } = useWorkout();
  const [loading, setLoading] = useState(false);
  const NewGymTrainingSchema = Yup.object().shape({
    rpe: Yup.string().required('Campo rpe obrigatório'),
    ...(!unrealizedTraining && {
      executionDay: Yup.string().required('Data de realização do treino obrigatório'),
    }),
  });
  const defaultValues = useMemo(
    () => ({
      comments: '',
      workoutId,
      rpe: 0,
      executionDay: null,
    }),
    [],
  );

  const methods = useForm({
    resolver: yupResolver(NewGymTrainingSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = useCallback(async (data) => {
    try {
      setLoading(true);
      const payload = Object.assign({}, data);
      payload.workoutId = Number(payload.workoutId);
      payload.rpe = Number(payload.rpe);
      if (unrealizedTraining) {
        payload.executionDay = convertDate(new Date());
        payload.unrealized = unrealizedTraining;
      } else {
        payload.executionDay = convertDate(payload.executionDay);
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

  return (
    <>
      <Stack>
        {unrealizedTraining && (
          <Alert variant="outlined" severity="warning">
            Treino não realizado
          </Alert>
        )}

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <>
            {!unrealizedTraining && (
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
            )}

            <Box rowGap={3} columnGap={2} display="grid" pt={2}>
              <RHFTextField
                name="comments"
                label="Comentários"
                variant="outlined"
                multiline
                rows={6}
                sx={{ pb: 2 }}
              />
            </Box>
            {!unrealizedTraining && (
              <Box>
                <RPSSlider control={control} />
              </Box>
            )}

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
    </>
  );
}
