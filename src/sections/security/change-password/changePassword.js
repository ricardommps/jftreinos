import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';
import useMyData from 'src/hooks/use-my-data';
import useUser from 'src/hooks/use-user';
import { useRouter } from 'src/routes/hook';
import axios from 'src/utils/axios';
import { fData } from 'src/utils/format-number';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

export default function ChangePassword() {
  const router = useRouter();

  const { logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const password = useBoolean();
  const { onChangePassword, changePasswordSuccess, changePasswordStatus } = useUser();
  const { myData, onGetMyData, onUpload, upload, uploadStatus } = useMyData();
  const [photoFile, setPhotoFile] = useState(null);

  const ChangePassWordSchema = Yup.object().shape({
    lastPassword: Yup.string().required('Senha antiga obrigatória'),
    newPassword: Yup.string()
      .required('Nova senha obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .test(
        'no-match',
        'A nova senha deve ser diferente da senha antiga',
        (value, { parent }) => value !== parent.lastPassword,
      ),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'As senhas devem ser iguais'),
  });

  const defaultValues = {
    lastPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    name: '',
    avatar: null,
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue } = methods;

  const onSubmit = useCallback(
    async (data) => {
      try {
        const payload = Object.assign({}, data);
        delete payload.name;
        delete payload.avatar;
        delete payload.email;
        onChangePassword(payload);
        reset();
      } catch (error) {
        enqueueSnackbar(error, {
          autoHideDuration: 3000,
          variant: 'error',
        });
      }
    },
    [enqueueSnackbar, reset],
  );

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue('avatar', newFile, { shouldValidate: true });
        const userName = myData.name.trim().split(' ').join('-');
        const fileExtension = file.path.split('.').pop();
        setPhotoFile({
          name: `${userName}.${fileExtension}`.toLowerCase(),
          preview: file.preview,
          type: file.type,
          file,
        });
      }
    },
    [myData],
  );

  async function onUpdadeAvatar() {
    const userPhotoUploadForm = new FormData();
    userPhotoUploadForm.append('file', photoFile.file, photoFile.name);
    onUpload(userPhotoUploadForm);
  }

  useEffect(() => {
    if (changePasswordSuccess) {
      enqueueSnackbar('Senha atualizada com sucesso! Faça seu login novamente', {
        autoHideDuration: 3000,
        variant: 'success',
      });
      handleLogout();
    }
  }, [changePasswordSuccess]);

  useEffect(() => {
    if (changePasswordStatus.error?.message) {
      enqueueSnackbar(changePasswordStatus.error.message, {
        autoHideDuration: 3000,
        variant: 'error',
      });
    }
  }, [changePasswordStatus.error]);

  useEffect(() => {
    if (myData?.id) {
      setValue('name', myData.name);
      setValue(
        'avatar',
        myData.avatar ? `${axios.defaults.baseURL}/avatar/${myData.avatar}` : null,
      );
      setValue('email', myData.email);
    }
  }, [myData]);

  useEffect(() => {
    if (upload) {
      enqueueSnackbar('Avatar atualizada com sucesso! Faça seu login novamente.', {
        autoHideDuration: 3000,
        variant: 'success',
      });
      handleLogout();
    }
  }, [upload]);

  useEffect(() => {
    onGetMyData();
  }, []);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        {false && (
          <Box>
            <RHFUploadAvatar
              name="avatar"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Permitido *.jpeg, *.jpg, *.png
                  <br />
                  tamanho máximo de {fData(3145728)}
                </Typography>
              }
            />
            {photoFile && (
              <Stack pt={3}>
                <LoadingButton
                  onClick={onUpdadeAvatar}
                  fullWidth
                  variant="contained"
                  loading={uploadStatus.loading}
                >
                  {myData?.avatar ? 'Atualizar foto' : 'Salvar foto'}
                </LoadingButton>
              </Stack>
            )}
            <Divider sx={{ py: 1 }} />
          </Box>
        )}

        <Stack spacing={3}>
          <RHFTextField name="name" label="Nome" disabled />
          <RHFTextField name="email" label="E-mail" disabled />
          <Divider />
        </Stack>
        <RHFTextField
          name="lastPassword"
          type={password.value ? 'text' : 'password'}
          label="Senha antiga"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="newPassword"
          label="Nova senha"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmNewPassword"
          type={password.value ? 'text' : 'password'}
          label="Confirme a nova senha"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack alignItems="flex-end" sx={{ mt: 3 }} spacing={2} flexDirection={'row'}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={changePasswordStatus.loading}
            sx={{ ml: 'auto' }}
          >
            Salvar
          </LoadingButton>
          <Button variant="outlined" color="inherit" onClick={() => router.back()}>
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
