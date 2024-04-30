import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';
import useRating from 'src/hooks/use-rating';
import { useRouter } from 'src/routes/hook';

import { RHFTextField } from '../hook-form';
import RatingPreview from './rating-preview';

export default function RatingForm({ ratingData, readOnly = false, onClose }) {
  const router = useRouter();
  const { onSaveRating, rating, ratingStatus, onClearRating } = useRating();
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = {
    ratingApp: ratingData?.ratingApp || null,
    commentsRatingApp: ratingData?.commentsRatingApp || undefined,
    ratingTrainings: ratingData?.ratingTrainings || null,
    commentsRatingTrainings: ratingData?.commentsRatingTrainings || undefined,
    testimony: ratingData?.testimony || undefined,
    notRating: ratingData?.notRating || null,
  };

  const methods = useForm({
    defaultValues,
  });
  const preview = useBoolean();
  const { reset, handleSubmit, control, watch } = methods;
  const values = watch();
  const onSubmit = useCallback(
    async (data) => {
      try {
        const data_ = Object.assign({}, data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const payload = Object.fromEntries(Object.entries(data_).filter(([_, v]) => v != null));
        if (payload.ratingApp) payload.ratingApp = Number(payload.ratingApp);
        if (payload.ratingTrainings) payload.ratingTrainings = Number(payload.ratingTrainings);
        onSaveRating(payload);
        reset();
      } catch (error) {
        onClearRating();
        enqueueSnackbar(error, {
          autoHideDuration: 3000,
          variant: 'error',
        });
      }
    },
    [enqueueSnackbar, reset],
  );

  useEffect(() => {
    if (rating) {
      enqueueSnackbar(
        'Sua avaliação foi salva com sucesso. Seu feedback é inestimável para mim e me ajuda a aprimorar continuamente meus serviços. Muito obrigado por sua avaliação.',
        {
          autoHideDuration: 12000,
          variant: 'success',
        },
      );
      onClearRating();
      router.replace('/');
    }
  }, [rating]);

  useEffect(() => {
    if (ratingStatus.error) {
      enqueueSnackbar('Não foi possivel registrar sua avaliação. Tente novamente mais tarde.', {
        autoHideDuration: 3000,
        variant: 'error',
      });
      onClearRating();
      router.replace('/');
    }
  }, [ratingStatus.error]);

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!preview.value && (
          <>
            <Stack justifyContent={'center'} alignItems={'center'} spacing={2} pb={3}>
              <Typography>Conte a sua história com a JF Assessoria</Typography>
              <RHFTextField
                name="testimony"
                label="Conte sua história"
                multiline
                rows={7}
                placeholder="Relate aqui a sua história"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: readOnly }}
              />
            </Stack>
            <Divider sx={{ py: 1 }} />
            <Stack justifyContent={'center'} alignItems={'center'} spacing={2} pb={3} pt={3}>
              <Controller
                control={control}
                name={'ratingTrainings'}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    name={'ratingTrainings'}
                    onChange={onChange}
                    value={value && Number(value)}
                    readOnly={readOnly}
                  />
                )}
              />
              <Typography component="legend">Satisfação com os treinos</Typography>
              <Typography variant="caption">
                Avalie a satisfação geral com os seus treinos prescritos
              </Typography>
              <Box width={'100%'}>
                <RHFTextField
                  name="commentsRatingTrainings"
                  label="Comentários - Opcional"
                  multiline
                  rows={4}
                  placeholder="Gostaria de deixar um comentário sobre sua avaliação com os treinos? - Opcional"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={!values.ratingTrainings}
                  InputProps={{ readOnly: readOnly }}
                />
              </Box>
            </Stack>
            <Divider sx={{ py: 1 }} />
            <Stack justifyContent={'center'} alignItems={'center'} spacing={2} pt={3}>
              <Controller
                control={control}
                name={'ratingApp'}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    name={'ratingApp'}
                    onChange={onChange}
                    value={value && Number(value)}
                    readOnly={readOnly}
                  />
                )}
              />
              <Typography component="legend">Satisfação com o App</Typography>
              <Typography variant="caption">Avalie a satisfação geral o app</Typography>
              <Box width={'100%'}>
                <RHFTextField
                  name="commentsRatingApp"
                  label="Comentários - Opcional"
                  multiline
                  rows={4}
                  placeholder="Gostaria de deixar um comentário sobre sua avaliação com o App? - Opcional"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: readOnly }}
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              alignItems="flex-end"
              justifyContent={'flex-end'}
              sx={{ mt: 3, mb: 3 }}
              spacing={2}
            >
              <Button variant="outlined" onClick={onClose}>
                Voltar
              </Button>
              <Button variant="contained" onClick={preview.onTrue}>
                Prximo
              </Button>
            </Stack>
          </>
        )}

        {preview.value && (
          <RatingPreview goBack={preview.onFalse} values={values} loading={ratingStatus.loading} />
        )}
      </FormProvider>
    </Box>
  );
}
