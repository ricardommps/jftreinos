'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FormProvider, {
  RHFOutlinedInput,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';
import Image from 'src/components/image/image';
import useAnamnese from 'src/hooks/use-anamnese';
import * as Yup from 'yup';

const RunningCompetitionExperienceOptions = [
  {
    value: 'Já corri em prova e ganhei colocação em nível geral',
    label: 'Já corri em prova e ganhei colocação em nível geral',
  },
  {
    value: 'Já corri em prova e ganhei colocação em nível de categoria (idade)',
    label: 'Já corri em prova e ganhei colocação em nível de categoria (idade)',
  },
  {
    value: 'Já participei de prova de corrida e finalizei a distância para qual me inscrevi',
    label: 'Já participei de prova de corrida e finalizei a distância para qual me inscrevi',
  },
  {
    value: 'Já participei de prova de corrida mas não finalizei a distância para qual me inscrevi',
    label: 'Já participei de prova de corrida mas não finalizei a distância para qual me inscrevi',
  },
  {
    value: 'Nunca participei de prova de corrida',
    label: 'Nunca participei de prova de corrida',
  },
];

const StrengtheningTrainingOptions = [
  { value: 'Não faço', label: 'Não faço' },
  {
    value: 'Faço treino de força específico para corredores',
    label: 'Faço treino de força específico para corredores',
  },
  {
    value: 'Faço treino de força mas não tenho certeza se este é específico para corredores',
    label: 'Faço treino de força mas não tenho certeza se este é específico para corredores',
  },
];

const EtilismoOptions = [
  { value: 'Não bebo álcool', label: 'Não bebo álcool' },
  { value: 'Bebo álcool esporadicamente', label: 'Bebo álcool esporadicamente' },
  { value: 'Bebo álcool frequentemente', label: 'Bebo álcool frequentemente' },
];

const SmokingOptions = [
  { value: 'Não fumo, mas já fumei', label: 'Não fumo, mas já fumei' },
  { value: 'Sou fumante', label: 'Sou fumante' },
  { value: 'Nunca tive o hábito de fumar', label: 'Nunca tive o hábito de fumar' },
];

const FoodOptions = [
  {
    value: 'Faço dieta para ganho de peso corporal',
    label: 'Faço dieta para ganho de peso corporal',
  },
  {
    value: 'Faço dieta para perda de peso corporal',
    label: 'Faço dieta para perda de peso corporal',
  },
  {
    value: 'Faço dieta para manter meu peso corporal',
    label: 'Faço dieta para manter meu peso corporal',
  },
  {
    value: 'Não faço dieta, mas controlo minha alimentação para me manter saudável',
    label: 'Não faço dieta, mas controlo minha alimentação para me manter saudável',
  },
  {
    value: 'Não controlo minha alimentação',
    label: 'Não controlo minha alimentação',
  },
];

const YesNoOptions = [
  { value: true, label: 'Sim' },
  { value: false, label: 'Não' },
];

const YesNoMaybeOptions = [
  { value: true, label: 'Sim' },
  { value: false, label: 'Não' },
  { value: 'maybe', label: 'Talvez' },
];

const ESTADOSBRASILEIROS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export const GENDER_OPTIONS = [
  { label: 'Masculino', value: 'Men' },
  { label: 'Feminino', value: 'Women' },
  { label: 'Outro', value: 'OTHER' },
];

export const MARITAL_OPTIONS = [
  { label: 'Solteiro(a)', value: 'Solteiro' },
  { label: 'Casado(a)', value: 'Casado' },
  { label: 'Divorciado(a)', value: 'Divorciado' },
  { label: 'Viúvo(a)', value: 'Viúvo' },
];

const runningExperienceOption = [
  {
    label: 'Corro semanalmente, com assessoria profissional',
    value: 'Corro semanalmente, com assessoria profissional',
  },
  {
    label: 'Corro semanalmente, sem assessoria profissional',
    value: 'Corro semanalmente, sem assessoria profissional',
  },
  {
    label: 'Corro esporadicamente, sem assessoria profissional',
    value: 'Corro esporadicamente, sem assessoria profissional',
  },
  {
    label: 'Já corri com assessoria profissional',
    value: 'Já corri com assessoria profissional',
  },
  {
    label: 'Já corri sem assessoria profissional',
    value: 'Já corri sem assessoria profissional',
  },
  { label: 'Nunca corri antes', value: 'Nunca corri antes' },
];

export default function AnamneseView() {
  const {
    checkEmail,
    onCheckEmail,
    checkEmailStatus,
    onCreateAnamnese,
    anamneseCreateStatus,
    anamneseCreate,
  } = useAnamnese();
  const { enqueueSnackbar } = useSnackbar();

  const [nextStep, setNextStep] = useState(false);

  const [noFatPercentage, setNoFatPercentage] = useState(false); // Estado para o switch
  const [isLoading, setIsLoading] = useState(false);

  const AnamneseSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email obrigatório')
      .email('O e-mail deve ser um endereço de e-mail válido'),

    // Campos que aparecem condicionalmente baseados em `nextStep`
    name: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    phone: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    gender: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    birthDate: Yup.date().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório').typeError('Data inválida'),
      otherwise: (schema) => schema.nullable(),
    }),
    maritalStatus: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    zipCode: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    street: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    streetNumber: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    city: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    state: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    district: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    weight: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    height: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    fatPercentage: Yup.string().nullable(),
    hasDiabetesOrHypertension: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    painOrInjuries: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    youSurgery: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    heartDisease: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    disease: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    isPregnant: Yup.bool().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    medicationsOrSupplements: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    etilismo: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    smoking: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    food: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    isVegetarian: Yup.bool().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    isVegan: Yup.bool().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    physicalActivity: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),
    intentionsStartingSportsConsultancy: Yup.string().when('email', {
      is: (email) => nextStep && !!email,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.nullable(),
    }),

    // Condicionais sobre assessoria de corrida
    lookingForRacingAdvice: Yup.bool().required('Campo obrigatório'),
    runningExperience: Yup.string().when('lookingForRacingAdvice', {
      is: true,
      then: (schema) => schema.required('Campo obrigatório se você busca assessoria de corrida'),
      otherwise: (schema) => schema.nullable(),
    }),
    strengtheningTraining: Yup.string().when('lookingForRacingAdvice', {
      is: true,
      then: (schema) => schema.required('Campo obrigatório se você busca assessoria de corrida'),
      otherwise: (schema) => schema.nullable(),
    }),
    runningCompetitionExperience: Yup.string().when('lookingForRacingAdvice', {
      is: true,
      then: (schema) => schema.required('Campo obrigatório se você busca assessoria de corrida'),
      otherwise: (schema) => schema.nullable(),
    }),
    youLookingForRaceConsultancy: Yup.string().when('lookingForRacingAdvice', {
      is: true,
      then: (schema) => schema.required('Campo obrigatório se você busca assessoria de corrida'),
      otherwise: (schema) => schema.nullable(),
    }),
    runningEventsFuture: Yup.string().when('lookingForRacingAdvice', {
      is: true,
      then: (schema) => schema.required('Campo obrigatório se você busca assessoria de corrida'),
      otherwise: (schema) => schema.nullable(),
    }),
    raceOnYourFutureCalendar: Yup.string().when('lookingForRacingAdvice', {
      is: true,
      then: (schema) => schema.required('Campo obrigatório se você busca assessoria de corrida'),
      otherwise: (schema) => schema.nullable(),
    }),
    daysOfTheWeekRun: Yup.string().when('lookingForRacingAdvice', {
      is: true,
      then: (schema) => schema.required('Campo obrigatório se você busca assessoria de corrida'),
      otherwise: (schema) => schema.nullable(),
    }),
    hasRunningClock: Yup.string().when('lookingForRacingAdvice', {
      is: true,
      then: (schema) => schema.required('Campo obrigatório se você busca assessoria de corrida'),
      otherwise: (schema) => schema.nullable(),
    }),
  });

  const defaultValues = {
    email: '',
    name: '',
    phone: '',
    gender: 'Men',
    birthDate: null,
    maritalStatus: 'Solteiro',
    zipCode: '',
    street: '',
    streetNumber: '',
    complement: '',
    city: '',
    state: '',
    district: '',
    weight: '',
    height: '',
    fatPercentage: '',
    hasDiabetesOrHypertension: '',
    painOrInjuries: '',
    youSurgery: '',
    heartDisease: '',
    disease: '',
    isPregnant: false,
    medicationsOrSupplements: '',
    etilismo: 'Não bebo álcool',
    smoking: 'Nunca tive o hábito de fumar',
    food: 'Faço dieta para ganho de peso corporal',
    isVegetarian: false,
    isVegan: false,
    physicalActivity: '',
    intentionsStartingSportsConsultancy: '',
    lookingForRacingAdvice: false,
    runningExperience: 'Nunca corri antes',
    longestRunningDistance: '',
    bestRunningTime: '',
    strengtheningTraining: 'Não faço',
    runningCompetitionExperience: 'Já corri em prova e ganhei colocação em nível gera',
    youLookingForRaceConsultancy: '',
    runningEventsFuture: false,
    raceOnYourFutureCalendar: '',
    daysOfTheWeekRun: '',
    hasRunningClock: '',
  };

  const methods = useForm({
    resolver: yupResolver(AnamneseSchema),
    defaultValues,
  });

  const { reset, watch, setValue, setError, clearErrors, control, handleSubmit } = methods;

  const values = watch();

  const handleChangeHeightMass = (e) => {
    let valor = e.target.value;

    // Substitui a vírgula por ponto para padronizar o valor
    valor = valor.replace(',', '.');

    // Validação para permitir apenas números e ponto
    const regex = /^\d*\.?\d*$/;

    // Verifica se o valor está dentro do padrão (números e ponto)
    if (regex.test(valor)) {
      setValue('height', valor);

      // Valida se o valor está entre 1.00 e 2.50 metros
      if (valor && (parseFloat(valor) < 1.0 || parseFloat(valor) > 2.5)) {
        setError('height', {
          type: 'custom',
          message: 'A altura deve estar entre 1.00 e 2.50 metros.',
        });
      } else {
        clearErrors('height');
      }
    }
  };

  const handleChangeweight = (e) => {
    let valor = e.target.value;

    // Substitui a vírgula por ponto para padronizar o valor
    valor = valor.replace(',', '.');

    // Validação para permitir apenas números e ponto
    const regex = /^\d*\.?\d*$/;

    // Verifica se o valor está dentro do padrão (números e ponto)
    if (regex.test(valor)) {
      setValue('weight', valor);

      // Valida se o valor está entre 30 e 200 kg
      if (valor && (parseFloat(valor) < 30 || parseFloat(valor) > 200)) {
        setError('weight', {
          type: 'custom',
          message: 'O peso deve ser um número entre 30 e 200 kg.',
        });
      } else {
        clearErrors('weight');
      }
    }
  };

  const handleChangeFatPercentage = (e) => {
    let valor = e.target.value;

    // Substitui a vírgula por ponto para padronizar o valor
    valor = valor.replace(',', '.');

    // Validação para permitir apenas números e ponto
    const regex = /^\d*\.?\d*$/;

    // Verifica se o valor está dentro do padrão (números e ponto)
    if (regex.test(valor)) {
      setValue('fatPercentage', valor);

      // Valida se o valor está entre 5% e 50%
      if (valor && (parseFloat(valor) < 5 || parseFloat(valor) > 50)) {
        setError('fatPercentage', {
          type: 'custom',
          message: 'O percentual de gordura deve ser entre 5% e 50%.',
        });
      } else {
        clearErrors('fatPercentage');
      }
    }
  };

  const handleChangeEmail = (event) => {
    const emailValue = event.target.value.toLowerCase();
    setValue('email', emailValue);
  };

  const handleToggleNoFatPercentage = (e) => {
    const checked = e.target.checked;
    setNoFatPercentage(checked);

    // Se o switch for ativado, limpa o campo de percentual de gordura
    if (checked) {
      setValue('fatPercentage', false); // Define como nulo se "Não sei informar" estiver ativado
      clearErrors('fatPercentage');
    } else {
      setValue('fatPercentage', ''); // Habilita o campo de volta
    }
  };

  const checkEmailExists = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        await onCheckEmail({ email: data.email });
      } catch (error) {
        reset();
        enqueueSnackbar(error, {
          autoHideDuration: 8000,
          variant: 'error',
        });
      }
    },
    [setIsLoading, onCheckEmail],
  );

  const onRegister = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        await onCreateAnamnese(data);
        // Fazer chamada à API para cadastrar o usuário
      } catch (error) {
        setIsLoading(false);
        reset();
      }
    },
    [setIsLoading],
  );

  useEffect(() => {
    if (checkEmailStatus?.error) {
      enqueueSnackbar('Este e-mail não tem permissão.', {
        autoHideDuration: 3000,
        variant: 'error',
      });
      setIsLoading(false);
    }
  }, [checkEmailStatus, setIsLoading]);

  useEffect(() => {
    if (anamneseCreateStatus?.error) {
      enqueueSnackbar('Não foi possível enviar sua anamnese. Tente novamente mais tarde.', {
        autoHideDuration: 3000,
        variant: 'error',
      });
      setIsLoading(false);
    }
  }, [anamneseCreateStatus, setIsLoading]);

  useEffect(() => {
    if (checkEmail) {
      setIsLoading(false);
      setNextStep(true);
    }
  }, [checkEmail]);

  useEffect(() => {
    if (anamneseCreate) {
      setIsLoading(false);
    }
  }, [anamneseCreate]);
  const renderHead = (
    <Stack p={4}>
      <Stack alignItems="center">
        <Image
          disabledEffect
          alt={'home'}
          src={`/assets/logo/joana.png`}
          style={{ width: 80, height: 'auto' }}
        />
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} p={2}>
      <Typography variant="h4">Identificação</Typography>
      <Divider sx={{ borderBottomWidth: 5 }} />
      <RHFTextField
        name="email"
        label="Email"
        disabled={nextStep}
        autoComplete="off"
        onChange={handleChangeEmail}
      />
      {nextStep && (
        <>
          <RHFTextField name="name" label="Nome" autoComplete="off" />
          <RHFTextField name="phone" label="Telefone" autoComplete="off" />
          <Stack>
            <Controller
              name="birthDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Data de Nasc."
                  value={dayjs(field?.value).toDate() || null}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                    },
                    actionBar: {
                      actions: ['clear'],
                    },
                  }}
                />
              )}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Sexo</Typography>
            <RHFRadioGroup row spacing={4} name="gender" options={GENDER_OPTIONS} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Estado civil:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <RHFRadioGroup row spacing={4} name="maritalStatus" options={MARITAL_OPTIONS} />
            </Stack>
          </Stack>
          <Stack spacing={2.5}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Endereço completo:
            </Typography>
            <RHFTextField name="zipCode" label="CEP" autoComplete="off" />
            <RHFTextField name="street" label="Rua" autoComplete="off" />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <RHFTextField
                  name="streetNumber"
                  label="Número"
                  autoComplete="off"
                  disabled={!values.street}
                />
              </Grid>
              <Grid item xs={8}>
                <RHFTextField
                  name="complement"
                  label="Complemento"
                  autoComplete="off"
                  disabled={!values.street}
                />
              </Grid>
            </Grid>
            <RHFTextField name="district" label="Bairro" autoComplete="off" />
            <RHFTextField name="city" label="Cidade" autoComplete="off" />
            <RHFSelect name="state" label="UF" variant="standard">
              {ESTADOSBRASILEIROS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <Divider sx={{ borderBottomWidth: 5 }} />
            <Stack>
              <Typography variant="subtitle2">1 - Massa corporal</Typography>
              <RHFOutlinedInput
                name="weight"
                label="Massa corporal"
                autoComplete="off"
                onChange={handleChangeweight}
              />
              <FormHelperText id="outlined-weight-helper-text">Exemplo: 44.5</FormHelperText>
            </Stack>

            <Stack>
              <Typography variant="subtitle2">2 - Altura</Typography>
              <RHFOutlinedInput
                name="height"
                label="Altura"
                autoComplete="off"
                onChange={handleChangeHeightMass}
              />
              <FormHelperText id="outlined-weight-helper-text">Exemplo: 1.70</FormHelperText>
            </Stack>

            <Stack>
              <Typography variant="subtitle2">3 - Percentual de gordura</Typography>
              <RHFOutlinedInput
                name="fatPercentage"
                label="Percentual de gordura"
                autoComplete="off"
                value={values.fatPercentage || ''}
                onChange={handleChangeFatPercentage}
                disabled={noFatPercentage} // Desabilita o campo se o switch "Não sei informar" estiver ativado
              />
              <FormHelperText id="outlined-weight-helper-text">Exemplo: 21</FormHelperText>
              <FormControlLabel
                control={
                  <Switch
                    checked={noFatPercentage}
                    onChange={handleToggleNoFatPercentage} // Função para ativar/desativar
                  />
                }
                label="Não sei informar"
              />
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              4 - Você possui diabetes ou problemas de pressão arterial? Se sim, qual (is)?
            </Typography>
            <RHFOutlinedInput name="hasDiabetesOrHypertension" />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              5 - Você possui dores ou lesões? Se sim, qual (is)?
            </Typography>
            <RHFTextField name="painOrInjuries" variant="outlined" multiline rows={3} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              6 - Você já realizou ou vai realizar alguma cirurgia? Se sim, qual (is)??
            </Typography>
            <RHFTextField name="youSurgery" variant="outlined" multiline rows={3} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              7 - Você ou alguém da sua família possui alguma cardiopatia? Se sim, quem e qual (is)?
            </Typography>
            <RHFTextField name="heartDisease" variant="outlined" multiline rows={3} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              8 - Você manifesta ou já manifestou qualquer outro tipo de doença? Se sim, qual (is)?
            </Typography>
            <RHFTextField name="disease" variant="outlined" multiline rows={3} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">9 - Você está grávida?</Typography>
            <RHFRadioGroup row spacing={4} name="isPregnant" options={YesNoOptions} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              10 - Usa medicamentos e/ou suplementos alimentares? Se sim, qual (is)?
            </Typography>
            <RHFTextField name="medicationsOrSupplements" variant="outlined" multiline rows={3} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">11 - Etilismo</Typography>
            <Stack spacing={2}>
              <RHFRadioGroup row spacing={4} name="etilismo" options={EtilismoOptions} />
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">12 - Tabagismo</Typography>
            <Stack spacing={2}>
              <RHFRadioGroup row spacing={4} name="smoking" options={SmokingOptions} />
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">13 - Alimentação</Typography>
            <Stack spacing={2}>
              <RHFRadioGroup row spacing={4} name="food" options={FoodOptions} />
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">14 - Vegetariano?</Typography>
            <Stack direction="row" spacing={2}>
              <RHFRadioGroup row spacing={4} name="isVegetarian" options={YesNoOptions} />
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">15 - Vegano?</Typography>
            <Stack direction="row" spacing={2}>
              <RHFRadioGroup row spacing={4} name="isVegan" options={YesNoOptions} />
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              16 - Você pratica alguma atividade física regularmente? Se sim, qual (is)?
            </Typography>
            <RHFTextField name="physicalActivity" variant="outlined" multiline rows={3} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              17 - Qual sua intenção em começar uma assessoria esportiva?
            </Typography>
            <RHFTextField
              name="intentionsStartingSportsConsultancy"
              variant="outlined"
              multiline
              rows={3}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">18 - Está buscando assessoria de corrida?</Typography>
            <Stack direction="row" spacing={2}>
              <RHFRadioGroup row spacing={4} name="lookingForRacingAdvice" options={YesNoOptions} />
            </Stack>
          </Stack>
          {values.lookingForRacingAdvice && (
            <>
              <Typography variant="h6">
                Caso tenha respondido "Sim" na questão anterior, responda as próximas questões.
              </Typography>
              <Divider sx={{ borderBottomWidth: 5 }} />
              <Stack>
                <Typography variant="subtitle2">
                  19 - Sobre sua experiência com a prática de corrida:
                </Typography>
                <Stack spacing={2}>
                  <RHFRadioGroup
                    row
                    spacing={4}
                    name="runningExperience"
                    options={runningExperienceOption}
                  />
                </Stack>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  20 - Se você corre, qual foi sua maior distância percorrida?
                </Typography>
                <RHFTextField name="longestRunningDistance" variant="outlined" multiline rows={3} />
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  21 - Se você corre, qual foi sua melhor marca e em qual distância ela aconteceu?
                </Typography>
                <RHFTextField name="bestRunningTime" variant="outlined" multiline rows={3} />
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  22 - Sobre seu treino de fortalecimento:
                </Typography>
                <Stack spacing={1}>
                  <RHFRadioGroup
                    row
                    spacing={4}
                    name="strengtheningTraining"
                    options={StrengtheningTrainingOptions}
                  />
                </Stack>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  23 - Sobre sua experiência com competições de corrida:
                </Typography>
                <Stack spacing={2}>
                  <RHFRadioGroup
                    row
                    spacing={4}
                    name="runningCompetitionExperience"
                    options={RunningCompetitionExperienceOptions}
                  />
                </Stack>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  24 - Por que você está procurando uma assessoria de corrida?
                </Typography>
                <RHFTextField
                  name="youLookingForRaceConsultancy"
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  25 - Você pretende participar de provas de corrida no futuro?
                </Typography>
                <Stack direction="row" spacing={2}>
                  <RHFRadioGroup
                    row
                    spacing={4}
                    name="runningEventsFuture"
                    options={YesNoMaybeOptions}
                  />
                </Stack>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  26 - Você já tem alguma prova de corrida em seu calendário futuro? Se sim, qual
                  distância pretende correr? E qual a data do(s) evento(s)?
                </Typography>
                <RHFTextField
                  name="raceOnYourFutureCalendar"
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  27 - Quantos dias da semana você pretende e pode correr? E quanto tempo você tem
                  para as sessões?
                </Typography>
                <RHFTextField name="daysOfTheWeekRun" variant="outlined" multiline rows={3} />
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  28 - Você possui relógio de corrida? Se sim, qual?
                </Typography>
                <RHFTextField name="hasRunningClock" variant="outlined" multiline rows={3} />
              </Stack>
            </>
          )}
        </>
      )}
      <Stack direction="row" spacing={2}>
        {!nextStep && (
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            variant="outlined"
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit(checkEmailExists)}
          >
            Verificar E-mail
          </LoadingButton>
        )}
        {nextStep && (
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            variant="outlined"
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit(onRegister)}
          >
            Cadastrar
          </LoadingButton>
        )}
      </Stack>
    </Stack>
  );

  return (
    <>
      <Stack spacing={1} p={2}>
        {renderHead}
        <Stack alignItems="center">
          <Typography variant="h2">Anamnese</Typography>
        </Stack>
        {!anamneseCreate ? (
          <FormProvider methods={methods}>{renderForm}</FormProvider>
        ) : (
          <Box>
            <Typography>
              Sua anamnese foi recebida com sucesso! Logo você receberá o acesso à plataforma e aos
              seus treinos!
            </Typography>
          </Box>
        )}
      </Stack>
    </>
  );
}
