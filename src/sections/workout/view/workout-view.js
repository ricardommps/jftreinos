'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import LoadingProgress from 'src/components/loading-progress';
import Scrollbar from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';
import useWorkout from 'src/hooks/use-workout';
import { useRouter } from 'src/routes/hook';
import DialogTablePaceSpeed from 'src/sections/home/dialog-table-pace-speed/dialog-table-pace-speed';
import TypeTraining from 'src/sections/home/trainings/type-training';
import CustomWorkoutView from 'src/sections/home/trainings/workout/workout-view';

import FinishWorkout from './finish-workout';

const STRETCH_TAGS = ['Alongamento ativo', 'Alongamento passivo', 'Alongamentos'];
const HEATING_TAGS = ['Aquecimento'];
const EXCLUDED_TAGS = [...STRETCH_TAGS, ...HEATING_TAGS];

export default function WorkoutView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const { id } = params;

  const isReadonly = searchParams.get('readonly');
  const { onGetWorkout, workout } = useWorkout();
  const openTable = useBoolean();
  const finishTraining = useBoolean();
  const openTypeTraining = useBoolean();

  const [typeTrainingSelected, setTypeTrainingSelected] = useState('indoor');
  const [unrealizedTraining, setUnrealizedTraining] = useState(false);
  const [mediasStretches, setMediasStretches] = useState([]);
  const [mediasHeating, setMediasHeating] = useState([]);
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(false);

  const onCloseTypeTraining = useCallback(() => {
    openTypeTraining.onFalse();
    setTypeTrainingSelected('indoor');
  }, []);

  const handleChangeSwitch = (event) => {
    setUnrealizedTraining(event.target.checked);
  };

  const handleOpenFinishTraining = () => {
    if (unrealizedTraining) {
      onOpenFinishTraining();
      return;
    }
    if (!workout.running) {
      onOpenFinishTraining();
    } else {
      openTypeTraining.onTrue();
    }
  };

  const onOpenFinishTraining = useCallback(() => {
    openTypeTraining.onFalse();
    finishTraining.onTrue();
  }, []);

  const initialize = useCallback(async () => {
    try {
      setLoading(true);
      await onGetWorkout(id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, onGetWorkout]);

  const handleGoBack = () => router.back();

  const handleFilterMedias = useCallback(() => {
    if (!workout) return;

    const { medias, stretchesOrder, heatingOrder, mediaOrder } = workout;

    if (stretchesOrder?.length && medias?.length) {
      setMediasStretches(
        medias.filter((item) => item.tags.some((tag) => STRETCH_TAGS.includes(tag))),
      );
    }

    if (heatingOrder?.length && medias?.length) {
      setMediasHeating(
        medias.filter((item) => item.tags.some((tag) => HEATING_TAGS.includes(tag))),
      );
    }

    if (mediaOrder?.length && medias?.length) {
      setMedias(medias.filter((item) => !item.tags.some((tag) => EXCLUDED_TAGS.includes(tag))));
    }
  }, [workout]);

  const RenderFinishTrainingButton = () => {
    if (!workout.running && !isReadonly) {
      return (
        <Button variant="contained" color="inherit" onClick={handleOpenFinishTraining}>
          Finalizar treino
        </Button>
      );
    }
    if (workout.running && !workout?.finished && !isReadonly) {
      return (
        <Button variant="contained" color="inherit" onClick={handleOpenFinishTraining}>
          Finalizar treino
        </Button>
      );
    }
    return null;
  };

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    handleFilterMedias();
  }, [workout, handleFilterMedias]);

  return (
    <>
      <Stack spacing={1.5} direction="row" pl={2}>
        <Button
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          onClick={handleGoBack}
        >
          Voltar
        </Button>
      </Stack>

      <Card>
        {loading ? (
          <LoadingProgress />
        ) : (
          workout && (
            <>
              <CardHeader
                title={workout?.name}
                subheader={workout?.subtitle}
                action={
                  workout?.name !== 'FORCA' && (
                    <Stack direction="row" alignItems="center" spacing={1.5} mt={0.5} pr={2}>
                      <Typography>Tabela Pace km-h</Typography>
                      <IconButton sx={{ padding: 0 }} onClick={openTable.onTrue}>
                        <Iconify icon="eva:info-outline" />
                      </IconButton>
                    </Stack>
                  )
                }
              />
              <CardContent sx={{ padding: 2 }}>
                <Stack spacing={2}>
                  <WorkoutSection
                    title="Aquecimento"
                    description={workout?.heating}
                    medias={mediasHeating}
                    mediaOrder={workout?.heatingOrder}
                    exerciseInfo={workout?.exerciseInfo}
                  />

                  <WorkoutSection
                    title=" Alongamentos ativos e educativos de corrida"
                    medias={mediasStretches}
                    mediaOrder={workout?.stretchesOrder}
                    exerciseInfo={workout?.exerciseInfo}
                  />

                  <WorkoutSection
                    title={workout.running ? 'Descrição' : 'Parte principal'}
                    description={workout?.description}
                    medias={medias}
                    mediaOrder={workout?.mediaOrder}
                    exerciseInfo={workout?.exerciseInfo}
                  />

                  {workout?.recovery && (
                    <>
                      <Divider sx={{ borderStyle: 'dashed' }} />
                      <Stack maxHeight={'20vh'} p={2}>
                        <Typography align="center" fontWeight="bold" variant="h5">
                          Desaquecimento
                        </Typography>
                        <Scrollbar>
                          <Typography sx={{ whiteSpace: 'pre-line' }}>
                            {workout?.recovery}
                          </Typography>
                        </Scrollbar>
                      </Stack>
                    </>
                  )}
                </Stack>
              </CardContent>
              <CardActions disableSpacing>
                <Stack direction="column" width={'100%'} spacing={2}>
                  {!workout?.finished && (
                    <Stack p={3} width={'100%'}>
                      <FormControlLabel
                        control={
                          <Switch
                            color="warning"
                            checked={unrealizedTraining}
                            onChange={handleChangeSwitch}
                          />
                        }
                        label="Treino não realizado"
                      />
                    </Stack>
                  )}

                  <Stack direction="row" spacing={2} justifyContent={'end'} pr={1}>
                    <Button variant="outlined" color="inherit" onClick={handleGoBack}>
                      Fechar
                    </Button>
                    <RenderFinishTrainingButton />
                  </Stack>
                </Stack>
              </CardActions>
            </>
          )
        )}
      </Card>
      {finishTraining.value && (
        <FinishWorkout
          open={finishTraining.value}
          onClose={finishTraining.onFalse}
          workout={workout}
          unrealizedTraining={unrealizedTraining}
          typeTrainingSelected={typeTrainingSelected}
        />
      )}
      {openTable.value && (
        <DialogTablePaceSpeed open={openTable.value} onClose={openTable.onFalse} />
      )}
      {openTypeTraining.value && (
        <TypeTraining
          open={openTypeTraining.value}
          onClose={onCloseTypeTraining}
          typeTrainingSelected={typeTrainingSelected}
          setTypeTrainingSelected={setTypeTrainingSelected}
          onOpenFinishTraining={onOpenFinishTraining}
        />
      )}
    </>
  );
}

function WorkoutSection({ title, description, medias, mediaOrder, exerciseInfo }) {
  if (!description && (!medias || medias.length === 0 || !mediaOrder?.length)) return null;

  return (
    <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' } }}>
      <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
        <Typography variant="subtitle1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {description && (
          <Stack p={2}>
            <Scrollbar>
              <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
            </Scrollbar>
          </Stack>
        )}
        {medias && medias.length > 0 && (
          <CustomWorkoutView medias={medias} mediaOrder={mediaOrder} exerciseInfo={exerciseInfo} />
        )}
      </AccordionDetails>
    </Accordion>
  );
}
