'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
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
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FormProvider, { RHFOutlinedInput, RHFSelect, RHFTextField } from 'src/components/hook-form';
import Image from 'src/components/image/image';
import * as Yup from 'yup';

const RunningCompetitionExperienceOptions = [
  {
    value: 'Já corri em prova e ganhei colocação em nível gera',
    label: 'Já corri em prova e ganhei colocação em nível gera',
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
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Feminino', value: 'Feminino' },
  { label: 'Outro', value: 'Outro' },
];

export const MARITAL_OPTIONS = [
  { label: 'Solteiro(a)', value: 'Solteiro' },
  { label: 'Casado(a)', value: 'Casado' },
  { label: 'Divorciado(a)', value: 'Divorciado' },
  { label: 'Viuvo(a)', value: 'Viuvo' },
];

export default function AnamneseView() {
  const [errorMsg, setErrorMsg] = useState('');
  const [nextStep, setNextStep] = useState(true);
  const [noFatPercentage, setNoFatPercentage] = useState(false); // Estado para o switch

  const AnamneseSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email obrigatório')
      .email('O e-mail deve ser um endereço de e-mail válido'),
    ...(nextStep && {
      name: Yup.string().required('Campo obrigatório'),
      phone: Yup.string().required('Campo obrigatório'),
      gender: Yup.string().required('Campo obrigatório'),
      birthDate: Yup.date().required('Campo obrigatório').typeError(''),
      maritalStatus: Yup.string().required('Campo obrigatório'),
      zipCode: Yup.string().required('Campo obrigatório'),
      street: Yup.string().required('Campo obrigatório'),
      streetNumber: Yup.string().required('Campo obrigatório'),
      city: Yup.string().required('Campo obrigatório'),
      state: Yup.string().required('Campo obrigatório'),
      district: Yup.string().required('Campo obrigatório'),
      bodyMass: Yup.string().required('Campo obrigatório'),
      height: Yup.string().required('Campo obrigatório'),
      fatPercentage: Yup.string().nullable(),
      hasDiabetesOrHypertension: Yup.string().required('Campo obrigatório'),
      painOrInjuries: Yup.string().required('Campo obrigatório'),
      heartDisease: Yup.string().required('Campo obrigatório'),
      disease: Yup.string().required('Campo obrigatório'),
      isPregnant: Yup.bool().required('Campo obrigatório'),
      medicationsOrSupplements: Yup.string().required('Campo obrigatório'),
      etilismo: Yup.string().required('Campo obrigatório'),
      smoking: Yup.string().required('Campo obrigatório'),
      food: Yup.string().required('Campo obrigatório'),
      isVegetarian: Yup.bool().required('Campo obrigatório'),
      isVegan: Yup.bool().required('Campo obrigatório'),
      physicalActivity: Yup.string().required('Campo obrigatório'),
      intentionsStartingSportsConsultancy: Yup.string().required('Campo obrigatório'),
      lookingForRacingAdvice: Yup.bool().required('Campo obrigatório'),
      runningExperience: Yup.string().when('lookingForRacingAdvice', {
        is: true, // Se lookingForRacingAdvice for true
        then: Yup.string().required('Campo obrigatório se você busca assessoria de corrida'), // Torna obrigatório
        otherwise: Yup.string().nullable(), // Deixa opcional
      }),
      longestRunningDistance: Yup.string().when('lookingForRacingAdvice', {
        is: true, // Se lookingForRacingAdvice for true
        then: Yup.string().required('Campo obrigatório se você busca assessoria de corrida'), // Torna obrigatório
        otherwise: Yup.string().nullable(), // Deixa opcional
      }),
      bestRunningTime: Yup.string().when('lookingForRacingAdvice', {
        is: true, // Se lookingForRacingAdvice for true
        then: Yup.string().required('Campo obrigatório se você busca assessoria de corrida'), // Torna obrigatório
        otherwise: Yup.string().nullable(), // Deixa opcional
      }),
      strengtheningTraining: Yup.string().when('lookingForRacingAdvice', {
        is: true, // Se lookingForRacingAdvice for true
        then: Yup.string().required('Campo obrigatório se você busca assessoria de corrida'), // Torna obrigatório
        otherwise: Yup.string().nullable(), // Deixa opcional
      }),
      runningCompetitionExperience: Yup.string().when('lookingForRacingAdvice', {
        is: true, // Se lookingForRacingAdvice for true
        then: Yup.string().required('Campo obrigatório se você busca assessoria de corrida'), // Torna obrigatório
        otherwise: Yup.string().nullable(), // Deixa opcional
      }),
      youLookingForRaceConsultancy: Yup.string().when('lookingForRacingAdvice', {
        is: true, // Se lookingForRacingAdvice for true
        then: Yup.string().required('Campo obrigatório se você busca assessoria de corrida'), // Torna obrigatório
        otherwise: Yup.string().nullable(), // Deixa opcional
      }),
      runningEventsFuture: Yup.string().when('lookingForRacingAdvice', {
        is: true, // Se lookingForRacingAdvice for true
        then: Yup.string().required('Campo obrigatório se você busca assessoria de corrida'), // Torna obrigatório
        otherwise: Yup.string().nullable(), // Deixa opcional
      }),
      raceOnYourFutureCalendar: Yup.string().when('lookingForRacingAdvice', {
        is: true, // Se lookingForRacingAdvice for true
        then: Yup.string().required('Campo obrigatório se você busca assessoria de corrida'), // Torna obrigatório
        otherwise: Yup.string().nullable(), // Deixa opcional
      }),
      daysOfTheWeekRun: Yup.string().when('lookingForRacingAdvice', {
        is: true, // Se lookingForRacingAdvice for true
        then: Yup.string().required('Campo obrigatório se você busca assessoria de corrida'), // Torna obrigatório
        otherwise: Yup.string().nullable(), // Deixa opcional
      }),
      hasRunningClock: Yup.string().when('lookingForRacingAdvice', {
        is: true, // Se lookingForRacingAdvice for true
        then: Yup.string().required('Campo obrigatório se você busca assessoria de corrida'), // Torna obrigatório
        otherwise: Yup.string().nullable(), // Deixa opcional
      }),
    }),
  });

  const defaultValues = {
    email: '',
    name: '',
    phone: '',
    gender: '',
    birthDate: null,
    maritalStatus: '',
    zipCode: '',
    street: '',
    streetNumber: '',
    complement: '',
    state: '',
    district: '',
    bodyMass: '',
    height: '',
    fatPercentage: '',
    hasDiabetesOrHypertension: '',
    painOrInjuries: '',
    heartDisease: '',
    disease: '',
    isPregnant: false,
    medicationsOrSupplements: '',
    etilismo: '',
    smoking: '',
    food: '',
    isVegetarian: false,
    isVegan: false,
    physicalActivity: '',
    intentionsStartingSportsConsultancy: '',
    lookingForRacingAdvice: false,
    runningExperience: '',
    longestRunningDistance: '',
    bestRunningTime: '',
    strengtheningTraining: '',
    runningCompetitionExperience: '',
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

  const {
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const handleChangeGender = useCallback(
    (newValue) => {
      setValue('gender', newValue);
    },
    [setValue],
  );

  const handleChangeMarital = useCallback(
    (newValue) => {
      setValue('maritalStatus', newValue);
    },
    [setValue],
  );

  const handleChangeEtilismo = useCallback(
    (newValue) => {
      setValue('etilismo', newValue);
    },
    [setValue],
  );

  const handleChangeSmoking = useCallback(
    (newValue) => {
      setValue('smoking', newValue);
    },
    [setValue],
  );

  const handleChangeFood = useCallback(
    (newValue) => {
      setValue('food', newValue);
    },
    [setValue],
  );

  const handleChangeRunningCompetitionExperience = useCallback(
    (newValue) => {
      setValue('runningCompetitionExperience', newValue);
    },
    [setValue],
  );

  const handleChangeStrengtheningTraining = useCallback(
    (newValue) => {
      setValue('strengtheningTraining', newValue);
    },
    [setValue],
  );

  const handleChangeIsPregnant = useCallback(
    (newValue) => {
      setValue('isPregnant', newValue);
    },
    [setValue],
  );

  const handleChangeRunningEventsFuture = useCallback(
    (newValue) => {
      setValue('runningEventsFuture', newValue);
    },
    [setValue],
  );

  const handleChangeIsVegetarian = useCallback(
    (newValue) => {
      setValue('isVegetarian', newValue);
    },
    [setValue],
  );

  const handleChangeRacingAdvice = useCallback(
    (newValue) => {
      setValue('lookingForRacingAdvice', newValue);
    },
    [setValue],
  );

  const handleChangeIsVegan = useCallback(
    (newValue) => {
      setValue('isVegan', newValue);
    },
    [setValue],
  );

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

  const handleChangeBodyMass = (e) => {
    let valor = e.target.value;

    // Substitui a vírgula por ponto para padronizar o valor
    valor = valor.replace(',', '.');

    // Validação para permitir apenas números e ponto
    const regex = /^\d*\.?\d*$/;

    // Verifica se o valor está dentro do padrão (números e ponto)
    if (regex.test(valor)) {
      setValue('bodyMass', valor);

      // Valida se o valor está entre 30 e 200 kg
      if (valor && (parseFloat(valor) < 30 || parseFloat(valor) > 200)) {
        setError('bodyMass', {
          type: 'custom',
          message: 'O peso deve ser um número entre 30 e 200 kg.',
        });
      } else {
        clearErrors('bodyMass');
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

  const handleToggleNoFatPercentage = (e) => {
    const checked = e.target.checked;
    setNoFatPercentage(checked);

    // Se o switch for ativado, limpa o campo de percentual de gordura
    if (checked) {
      setValue('fatPercentage', null); // Define como nulo se "Não sei informar" estiver ativado
      clearErrors('fatPercentage');
    } else {
      setValue('fatPercentage', ''); // Habilita o campo de volta
    }
  };

  const checkEmailExists = useCallback(
    async (data) => {
      try {
        //const response = await axios.post('/api/check-email', { email: data.email });
        // eslint-disable-next-line no-constant-condition
        setNextStep(true);
      } catch (error) {
        console.error(error);
        setErrorMsg('Erro ao verificar o e-mail.');
      }
    },
    [setErrorMsg],
  );

  const onRegister = useCallback(async (data) => {
    try {
      console.log('Dados do cadastro:', data);
      // Fazer chamada à API para cadastrar o usuário
    } catch (error) {
      console.error(error);
      setErrorMsg('Erro ao cadastrar o usuário.');
    }
  }, []);

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
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <Typography variant="h4">Identificação</Typography>
      <Divider sx={{ borderBottomWidth: 5 }} />
      <RHFTextField name="email" label="Email" disabled={nextStep} autoComplete="off" />
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
                      helperText: error?.message,
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
            <Stack direction="row" spacing={1}>
              {GENDER_OPTIONS.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={values.gender === option.value}
                      onClick={() => handleChangeGender(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Estado civil:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {MARITAL_OPTIONS.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={values.maritalStatus === option.value}
                      onClick={() => handleChangeMarital(option.value)}
                    />
                  }
                  label={option.label}
                  sx={{ minWidth: 120 }} // Define um tamanho mínimo para os itens
                />
              ))}
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
                name="bodyMass"
                label="Massa corporal"
                autoComplete="off"
                InputProps={{ inputProps: { min: 10, max: 300, step: 0.1 } }}
                onChange={handleChangeBodyMass}
                helperText={'Exemplo: 44.5'}
              />
              <FormHelperText id="outlined-weight-helper-text">Exemplo: 44.5</FormHelperText>
            </Stack>

            <Stack>
              <Typography variant="subtitle2">2 - Altura</Typography>
              <RHFOutlinedInput
                name="height"
                label="Altura"
                autoComplete="off"
                InputProps={{ inputProps: { min: 10, max: 300, step: 0.1 } }}
                onChange={handleChangeHeightMass}
                helperText={'Exemplo: 1.70'}
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
                helperText={'Exemplo: 21%'}
              />
              <FormHelperText id="outlined-weight-helper-text">Exemplo: 21</FormHelperText>
              <FormControlLabel
                control={
                  <Switch
                    checked={noFatPercentage}
                    onChange={handleToggleNoFatPercentage} // Função para ativar/desativar
                    inputProps={{ 'aria-label': 'Não sei informar' }}
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
              6 - Você ou alguém da sua família possui alguma cardiopatia? Se sim, quem e qual (is)?
            </Typography>
            <RHFTextField name="heartDisease" variant="outlined" multiline rows={3} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              7 - Você manifesta ou já manifestou qualquer outro tipo de doença? Se sim, qual (is)?
            </Typography>
            <RHFTextField name="disease" variant="outlined" multiline rows={3} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">8 - Você está grávida?</Typography>
            <Stack direction="row" spacing={1}>
              {YesNoOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={values.isPregnant === option.value}
                      onClick={() => handleChangeIsPregnant(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              9 - Usa medicamentos e/ou suplementos alimentares? Se sim, qual (is)?
            </Typography>
            <RHFTextField name="medicationsOrSupplements" variant="outlined" multiline rows={3} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">10 - Etilismo</Typography>
            <Stack spacing={1}>
              {EtilismoOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={values.etilismo === option.value}
                      onClick={() => handleChangeEtilismo(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">11 - Tabagismo</Typography>
            <Stack spacing={1}>
              {SmokingOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={values.smoking === option.value}
                      onClick={() => handleChangeSmoking(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">12 - Alimentação</Typography>
            <Stack spacing={1}>
              {FoodOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={values.food === option.value}
                      onClick={() => handleChangeFood(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">13 - Vegetariano?</Typography>
            <Stack direction="row" spacing={1}>
              {YesNoOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={values.isVegetarian === option.value}
                      onClick={() => handleChangeIsVegetarian(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">14 - Vegano?</Typography>
            <Stack direction="row" spacing={1}>
              {YesNoOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={values.isVegan === option.value}
                      onClick={() => handleChangeIsVegan(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              15 - Você pratica alguma atividade física regularmente? Se sim, qual (is)?
            </Typography>
            <RHFTextField name="physicalActivity" variant="outlined" multiline rows={3} />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">
              16 - Qual sua intenção em começar uma assessoria esportiva?
            </Typography>
            <RHFTextField
              name="intentionsStartingSportsConsultancy"
              variant="outlined"
              multiline
              rows={3}
            />
          </Stack>
          <Stack>
            <Typography variant="subtitle2">17 - Está buscando assessoria de corrida?</Typography>
            <Stack direction="row" spacing={1}>
              {YesNoOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={values.lookingForRacingAdvice === option.value}
                      onClick={() => handleChangeRacingAdvice(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </Stack>
          </Stack>
          {values.lookingForRacingAdvice && (
            <>
              <Typography variant="h6">
                Caso tenha respondido ´´Sim´´ na questão anterior, responda as próximas questões.
              </Typography>
              <Divider sx={{ borderBottomWidth: 5 }} />
              <Stack>
                <Typography variant="subtitle2">
                  18 - Sobre sua experiência com a prática de corrida:
                </Typography>
                <RHFTextField name="runningExperience" variant="outlined" multiline rows={3} />
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  19 - Se você corre, qual foi sua maior distância percorrida?
                </Typography>
                <RHFTextField name="longestRunningDistance" variant="outlined" multiline rows={3} />
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  20 - Se você corre, qual foi sua melhor marca e em qual distância ela aconteceu?
                </Typography>
                <RHFTextField name="bestRunningTime" variant="outlined" multiline rows={3} />
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  21 - Sobre seu treino de fortalecimento:
                </Typography>
                <Stack spacing={1}>
                  {StrengtheningTrainingOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={values.strengtheningTraining === option.value}
                          onClick={() => handleChangeStrengtheningTraining(option.value)}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </Stack>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  22 - Sobre sua experiência com competições de corrida:
                </Typography>
                <Stack spacing={1}>
                  {RunningCompetitionExperienceOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={values.runningCompetitionExperience === option.value}
                          onClick={() => handleChangeRunningCompetitionExperience(option.value)}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </Stack>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  23 - Por que você está procurando uma assessoria de corrida?
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
                  24 - Você pretende participar de provas de corrida no futuro?
                </Typography>
                <Stack direction="row" spacing={1}>
                  {YesNoMaybeOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={values.runningEventsFuture === option.value}
                          onClick={() => handleChangeRunningEventsFuture(option.value)}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </Stack>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  25 - Você já tem alguma prova de corrida em seu calendário futuro? Se sim, qual
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
                  26 - Quantos dias da semana você pretende e pode correr? E quanto tempo você tem
                  para as sessões?
                </Typography>
                <RHFTextField name="daysOfTheWeekRun" variant="outlined" multiline rows={3} />
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  27 - Você possui relógio de corrida? Se sim, qual?
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
            type="button"
            variant="contained"
            onClick={handleSubmit(checkEmailExists)}
            disabled={nextStep || isSubmitting}
          >
            Verificar E-mail
          </LoadingButton>
        )}
        {nextStep && (
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="button"
            variant="contained"
            loading={isSubmitting}
            onClick={handleSubmit(onRegister)}
          >
            Cadastrar
          </LoadingButton>
        )}
      </Stack>
    </Stack>
  );
  console.log('---noFatPercentage---', noFatPercentage);
  return (
    <>
      <Stack spacing={1} p={2}>
        {renderHead}
        <Stack alignItems="center">
          <Typography variant="h2">Anamnese</Typography>
        </Stack>
        <FormProvider methods={methods}>{renderForm}</FormProvider>
      </Stack>
    </>
  );
}
