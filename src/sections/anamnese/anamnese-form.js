import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FormProvider, {
  RHFOutlinedInput,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import * as Yup from 'yup';

import {
  ESTADOSBRASILEIROS,
  EtilismoOptions,
  FoodOptions,
  GENDER_OPTIONS,
  MARITAL_OPTIONS,
  RunningCompetitionExperienceOptions,
  runningExperienceOption,
  SmokingOptions,
  StrengtheningTrainingOptions,
  YesNoMaybeOptions,
  YesNoOptions,
} from './constants';

export default function AnamneseForm({
  email,
  customer,
  anamnese,
  nextStep,
  isLoading,
  checkEmailExists,
  onRegister,
  showPassword,
  onLogin,
}) {
  const password = useBoolean();
  const [noFatPercentage, setNoFatPercentage] = useState(false);
  const AnamneseSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email obrigatório')
      .email('O e-mail deve ser um endereço de e-mail válido'),
    password: Yup.string().when('email', {
      is: (email) => showPassword && !!email,
      then: (schema) => schema.required('Senha obrigatória'),
      otherwise: (schema) => schema.nullable(),
    }),
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
    email: email ? email : customer?.email || '',
    password: '',
    name: customer?.name || '',
    phone: customer?.phone || '',
    gender: customer?.gender || 'Men',
    birthDate: customer?.birthDate || null,
    maritalStatus: customer?.maritalStatus || 'Solteiro',
    zipCode: customer?.zipCode || '',
    street: customer?.street || '',
    streetNumber: customer?.streetNumber || '',
    complement: customer?.complement || '',
    city: customer?.city || '',
    state: customer?.state || '',
    district: customer?.district || '',
    weight: customer?.weight || '',
    height: customer?.height || '',
    fatPercentage: customer?.fatPercentage || '',
    hasDiabetesOrHypertension: anamnese?.hasDiabetesOrHypertension || '',
    painOrInjuries: anamnese?.painOrInjuries || '',
    youSurgery: anamnese?.youSurgery || '',
    heartDisease: anamnese?.heartDisease || '',
    disease: anamnese?.disease || '',
    isPregnant: anamnese?.isPregnant || false,
    medicationsOrSupplements: anamnese?.medicationsOrSupplements || '',
    etilismo: anamnese?.etilismo || 'Não bebo álcool',
    smoking: anamnese?.smoking || 'Nunca tive o hábito de fumar',
    food: anamnese?.food || 'Faço dieta para ganho de peso corporal',
    isVegetarian: anamnese?.isVegetarian || false,
    isVegan: anamnese?.isVegan || false,
    physicalActivity: anamnese?.physicalActivity || '',
    intentionsStartingSportsConsultancy: anamnese?.intentionsStartingSportsConsultancy || '',
    lookingForRacingAdvice: anamnese?.lookingForRacingAdvice || false,
    runningExperience: anamnese?.runningExperience || 'Nunca corri antes',
    longestRunningDistance: anamnese?.longestRunningDistance || '',
    bestRunningTime: anamnese?.bestRunningTime || '',
    strengtheningTraining: anamnese?.strengtheningTraining || 'Não faço',
    runningCompetitionExperience:
      anamnese?.runningCompetitionExperience ||
      'Já corri em prova e ganhei colocação em nível gera',
    youLookingForRaceConsultancy: anamnese?.youLookingForRaceConsultancy || '',
    runningEventsFuture: anamnese?.runningEventsFuture || false,
    raceOnYourFutureCalendar: anamnese?.raceOnYourFutureCalendar || '',
    daysOfTheWeekRun: anamnese?.daysOfTheWeekRun || '',
    hasRunningClock: anamnese?.hasRunningClock || '',
  };

  const methods = useForm({
    resolver: yupResolver(AnamneseSchema),
    defaultValues,
  });

  const { watch, setValue, setError, clearErrors, control, handleSubmit, reset } = methods;

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
      {showPassword && (
        <RHFTextField
          name="password"
          label="Password"
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
      )}
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
        {!nextStep && !showPassword && (
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
        {showPassword && (
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            variant="outlined"
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit(onLogin)}
          >
            Acessar
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

  useEffect(() => {
    reset(defaultValues);
  }, [customer]);

  useEffect(() => {
    if (email) {
      reset(defaultValues);
    }
  }, [email]);

  return <FormProvider methods={methods}>{renderForm}</FormProvider>;
}
