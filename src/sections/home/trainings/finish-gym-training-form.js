import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import useHome from 'src/hooks/use-home';
import * as Yup from 'yup';

import RPSSlider from './rpe-slider';

export default function FinishGymTrainingForm({ trainingId, onClose, unrealizedTraining }) {
  const { onFinishedTraining, finishedtrainingDetailStatus } = useHome();
  const NewGymTrainingSchema = Yup.object().shape({
    rpe: Yup.string().required('Campo rpe obrigatório'),
  });
  const defaultValues = useMemo(
    () => ({
      comments: '',
      trainingId,
      rpe: 0,
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
      const payload = Object.assign({}, data);
      payload.trainingId = Number(payload.trainingId);
      payload.rpe = Number(payload.rpe);
      if (unrealizedTraining) {
        payload.unrealized = unrealizedTraining;
      }

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
