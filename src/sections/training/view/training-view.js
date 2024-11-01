'use client';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';
import useTraining from 'src/hooks/use-training';
import { useRouter } from 'src/routes/hook';
import DialogTablePaceSpeed from 'src/sections/home/dialog-table-pace-speed/dialog-table-pace-speed';
import FinishTraining from 'src/sections/home/trainings/ finish-training';
import TypeTraining from 'src/sections/home/trainings/type-training';
import WorkoutView from 'src/sections/home/trainings/workout/workout-view';
import { fDateCalender } from 'src/utils/format-time';
import { getModuleName } from 'src/utils/modules';

const stretchTags = ['Alongamento ativo', 'Alongamento passivo', 'Alongamentos'];
const heatingTags = ['Aquecimento'];
const excludedTags = ['Alongamento ativo', 'Alongamento passivo', 'Alongamentos', 'Aquecimento'];

export default function TrainingView() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { onGetTraining, training } = useTraining();
  const openTable = useBoolean();
  const finishTraining = useBoolean();
  const openTypeTraining = useBoolean();

  const [unrealizedTraining, setUnrealizedTraining] = useState(false);
  const [typeTrainingSelected, setTypeTrainingSelected] = useState('indoor');
  const [mediasStretches, setMediasStretches] = useState([]);
  const [mediasHeating, setMediasHeating] = useState([]);
  const [medias, setMedias] = useState([]);

  const handleChangeSwitch = (event) => {
    setUnrealizedTraining(event.target.checked);
  };

  const handleOpenFinishTraining = () => {
    if (unrealizedTraining) {
      onOpenFinishTraining();
      return;
    }
    if (training.type === 2) {
      onOpenFinishTraining();
    } else {
      openTypeTraining.onTrue();
    }
  };

  const onCloseTypeTraining = useCallback(() => {
    openTypeTraining.onFalse();
    setTypeTrainingSelected('indoor');
  }, []);

  const onOpenFinishTraining = useCallback(() => {
    openTypeTraining.onFalse();
    finishTraining.onTrue();
  }, []);

  const initialize = useCallback(async () => {
    onGetTraining(id);
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (training) {
      const medias = training?.training?.medias;
      const stretchesOrder = training?.training?.stretchesOrder;
      const heatingOrder = training?.training?.heatingOrder;
      const mediaOrder = training?.training?.mediaOrder;
      if (stretchesOrder && medias.length > 0 && stretchesOrder.length > 0) {
        const filteredStretches = medias?.filter((item) =>
          item.tags.some((tag) => stretchTags.includes(tag)),
        );
        setMediasStretches(filteredStretches);
      }

      if (heatingOrder && medias.length > 0 && heatingOrder?.length > 0) {
        const filteredHeating = medias?.filter((item) =>
          item.tags.some((tag) => heatingTags.includes(tag)),
        );
        setMediasHeating(filteredHeating);
      }

      if (mediaOrder && medias.length > 0 && mediaOrder.length > 0) {
        // const orderedItems = medias
        //   .filter((item) => mediaOrder.includes(item.id))
        //   .sort((a, b) => mediaOrder.indexOf(a.id) - mediaOrder.indexOf(b.id));
        const filteredWorkout = medias?.filter(
          (item) => !item.tags.some((tag) => excludedTags.includes(tag)),
        );
        setMedias(filteredWorkout);
      }
    }
  }, [training, setMediasStretches, setMedias, setMediasHeating]);
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
        {training?.training && (
          <>
            <CardHeader
              action={
                <>
                  {training.training.name !== 'FORCA' && (
                    <Stack>
                      <Stack spacing={1.5} direction="row" mt={0.5} pr={2}>
                        <Typography>Tabela Pace km/h</Typography>
                        <IconButton sx={{ padding: 0 }} onClick={openTable.onTrue}>
                          <Iconify icon="eva:info-outline" />
                        </IconButton>
                      </Stack>
                    </Stack>
                  )}
                </>
              }
              title={getModuleName(training?.training?.name)}
              subheader={getModuleName(training?.training?.subtitle)}
            />
            <CardContent sx={{ padding: 2 }}>
              <Stack spacing={2}>
                <Stack sx={{ typography: 'body2' }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Data do treino
                  </Typography>
                  <Typography variant="subtitle2">
                    {fDateCalender(training?.training?.datePublished)}
                  </Typography>
                  {training?.training?.trainingDateOther && (
                    <>
                      <Typography variant="subtitle1" sx={{ mb: 0 }}>
                        ou
                      </Typography>
                      <Typography variant="subtitle2">
                        {fDateCalender(training?.training?.trainingDateOther)}
                      </Typography>
                    </>
                  )}
                </Stack>

                {(training?.training?.heating || training?.training?.heatingOrder?.length > 0) && (
                  <>
                    <Accordion
                      aria-controls="stretches-medias-content"
                      id="stretches-medias-header"
                      defaultExpanded
                      elevation={0}
                      sx={{
                        '&:before': {
                          display: 'none',
                        },
                      }}
                    >
                      <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                        <Typography variant="subtitle1">Aquecimento</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ padding: 0 }}>
                        {training?.training?.heating && (
                          <Stack maxHeight={'20vh'} p={2}>
                            <Scrollbar>
                              <Typography sx={{ whiteSpace: 'pre-line' }}>
                                {training?.training?.heating}
                              </Typography>
                            </Scrollbar>
                          </Stack>
                        )}
                        {training?.training?.heatingOrder?.length > 0 &&
                          mediasHeating &&
                          mediasHeating.length > 0 && (
                            <Box>
                              <Stack>
                                <WorkoutView
                                  mediaOrder={training?.training?.heatingOrder}
                                  medias={mediasHeating}
                                  exerciseInfo={training?.training?.exerciseInfo}
                                />
                              </Stack>
                            </Box>
                          )}
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}

                {mediasStretches &&
                  mediasStretches.length > 0 &&
                  training?.training?.stretchesOrder.length > 0 && (
                    <>
                      <Accordion
                        aria-controls="stretches-medias-content"
                        id="stretches-medias-header"
                        defaultExpanded
                        elevation={0}
                        sx={{
                          '&:before': {
                            display: 'none',
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                        >
                          <Typography variant="subtitle1">
                            Alongamentos ativos e educativos de corrida
                          </Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{ padding: 0 }}>
                          <Stack maxHeight={'80vh'}>
                            <Scrollbar sx={{ height: 320 }}>
                              <Box pt={2}>
                                <Stack pt={2}>
                                  <WorkoutView
                                    mediaOrder={training?.training?.stretchesOrder}
                                    medias={mediasStretches}
                                    exerciseInfo={training?.training?.exerciseInfo}
                                  />
                                </Stack>
                              </Box>
                            </Scrollbar>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  )}

                {(training?.training?.description || training?.training?.mediaOrder.length > 0) && (
                  <>
                    <Accordion
                      aria-controls="stretches-medias-content"
                      id="stretches-medias-header"
                      defaultExpanded
                      elevation={0}
                      sx={{
                        '&:before': {
                          display: 'none',
                        },
                      }}
                    >
                      <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                        <Typography variant="subtitle1">
                          {' '}
                          {!training.type || training.type === 1 ? 'Descrição' : 'Parte principal'}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ padding: 0 }}>
                        {training?.training?.description && (
                          <Stack p={2}>
                            <Scrollbar>
                              <Typography sx={{ whiteSpace: 'pre-line' }}>
                                {training?.training?.description}
                              </Typography>
                            </Scrollbar>
                          </Stack>
                        )}

                        {medias &&
                          medias.length > 0 &&
                          training?.training?.mediaOrder.length > 0 && (
                            <Box>
                              <Stack>
                                <WorkoutView
                                  mediaOrder={training?.training?.mediaOrder}
                                  medias={medias}
                                  exerciseInfo={training?.training?.exerciseInfo}
                                />
                              </Stack>
                            </Box>
                          )}
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}

                {training?.training?.recovery && (
                  <>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                    <Stack maxHeight={'20vh'}>
                      <Typography align="center" fontWeight={'bold'} variant="h5">
                        Desaquecimento
                      </Typography>
                      <Scrollbar>
                        <Typography sx={{ whiteSpace: 'pre-line' }} pt={1}>
                          {training?.training?.recovery}
                        </Typography>
                      </Scrollbar>
                    </Stack>
                  </>
                )}
              </Stack>
            </CardContent>
            <CardActions disableSpacing>
              <Stack direction="column" width={'100%'} spacing={2}>
                {!training?.training?.finished && (
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
                  {!training?.training?.finished && (
                    <Button variant="contained" color="inherit" onClick={handleOpenFinishTraining}>
                      Finalizar treino
                    </Button>
                  )}
                </Stack>
              </Stack>
            </CardActions>
          </>
        )}
      </Card>
      {finishTraining.value && (
        <FinishTraining
          open={finishTraining.value}
          onClose={finishTraining.onFalse}
          training={training.training}
          type={training.type}
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
