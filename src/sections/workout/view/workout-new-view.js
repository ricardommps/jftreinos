'use client';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import LoadingProgress from 'src/components/loading-progress';
import Scrollbar from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';
import useWorkouts from 'src/hooks/use-workouts';
import { useRouter } from 'src/routes/hook';
import DialogTablePaceSpeed from 'src/sections/home/dialog-table-pace-speed/dialog-table-pace-speed';
import TypeTraining from 'src/sections/home/trainings/type-training';

import WorkoutView from '../components/workoutView/workout-view';
import FinishWorkout from './finish-workout';

export default function WorkoutNewView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const { id } = params;

  const finishTraining = useBoolean();
  const openTypeTraining = useBoolean();
  const openTable = useBoolean();

  const isReadonly = searchParams.get('readonly');

  const { onGetWorkoutItem, workoutItem } = useWorkouts();

  const [loading, setLoading] = useState(false);
  const [unrealizedTraining, setUnrealizedTraining] = useState(false);
  const [typeTrainingSelected, setTypeTrainingSelected] = useState('indoor');
  const [checkList, setCheckList] = useState([]);

  const handleCheckList = (value) => {
    const currentIndex = checkList.indexOf(value);

    const newCheckList = [...checkList];

    if (currentIndex === -1) {
      newCheckList.push(value);
    } else {
      newCheckList.splice(currentIndex, 1);
    }

    setCheckList(newCheckList);
  };

  const handleGoBack = () => router.back();

  const handleChangeSwitch = (event) => {
    setUnrealizedTraining(event.target.checked);
  };

  const onCloseTypeTraining = useCallback(() => {
    openTypeTraining.onFalse();
    setTypeTrainingSelected('indoor');
  }, []);

  const handleOpenFinishTraining = () => {
    if (unrealizedTraining) {
      onOpenFinishTraining();
      return;
    }
    if (!workoutItem.running) {
      onOpenFinishTraining();
    } else {
      openTypeTraining.onTrue();
    }
  };

  const onOpenFinishTraining = useCallback(() => {
    openTypeTraining.onFalse();
    finishTraining.onTrue();
  }, []);

  const RenderFinishTrainingButton = () => {
    if (!workoutItem.running && !isReadonly) {
      return (
        <Button variant="contained" color="inherit" onClick={handleOpenFinishTraining}>
          Finalizar treino
        </Button>
      );
    }
    if (workoutItem.running && !workoutItem?.finished && !isReadonly) {
      return (
        <Button variant="contained" color="inherit" onClick={handleOpenFinishTraining}>
          Finalizar treino
        </Button>
      );
    }
    return null;
  };

  const initialize = useCallback(async () => {
    try {
      setLoading(true);
      await onGetWorkoutItem(id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, onGetWorkoutItem]);

  useEffect(() => {
    initialize();
  }, [initialize]);

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
          <>
            {workoutItem && (
              <>
                <CardHeader
                  title={workoutItem?.subtitle}
                  action={
                    workoutItem?.title !== 'FORCA' && (
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
                    {workoutItem.workoutItems.length > 0 && (
                      <>
                        {workoutItem.workoutItems.map((item) => (
                          <WorkoutSection
                            key={item.id}
                            title={item.category}
                            description={item.description}
                            medias={item.medias}
                            mediaOrder={item.mediaOrder}
                            exerciseInfo={item.mediaInfo}
                            isWorkoutLoad={item.isWorkoutLoad}
                            checkList={checkList}
                            handleCheckList={handleCheckList}
                          />
                        ))}
                      </>
                    )}
                  </Stack>
                </CardContent>
                <CardActions disableSpacing>
                  <Stack direction="column" width={'100%'} spacing={2}>
                    {!workoutItem?.finished && (
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
            )}
          </>
        )}
      </Card>
      {finishTraining.value && (
        <FinishWorkout
          open={finishTraining.value}
          onClose={finishTraining.onFalse}
          workout={workoutItem}
          unrealizedTraining={unrealizedTraining}
          typeTrainingSelected={typeTrainingSelected}
          checkList={checkList}
          newVersion={true}
        />
      )}
      {openTypeTraining.value && (
        <TypeTraining
          open={openTypeTraining.value}
          onClose={onCloseTypeTraining}
          typeTrainingSelected={typeTrainingSelected}
          setTypeTrainingSelected={setTypeTrainingSelected}
          onOpenFinishTraining={onOpenFinishTraining}
          newVersion={true}
        />
      )}
      {openTable.value && (
        <DialogTablePaceSpeed open={openTable.value} onClose={openTable.onFalse} />
      )}
    </>
  );
}

function WorkoutSection({
  title,
  description,
  medias,
  mediaOrder,
  exerciseInfo,
  isWorkoutLoad,
  checkList,
  handleCheckList,
}) {
  // if (!description && (!medias || medias.length === 0 || !mediaOrder?.length)) return null;

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
          <WorkoutView
            medias={medias}
            mediaOrder={mediaOrder}
            mediaInfo={exerciseInfo}
            isWorkoutLoad={isWorkoutLoad}
            checkList={checkList}
            handleCheckList={handleCheckList}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
}
