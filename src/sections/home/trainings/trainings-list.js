import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import Scrollbar from 'src/components/scrollbar/scrollbar';

import Calendar from './calendar/calendar';
import CurrentTraining from './current-training';
import Expired from './expired';
import Finished from './finished';
import NextTraining from './nextTraining';
export default function TrainingsList({ trainings }) {
  const [curretTraining, setCurretTraining] = useState(null);
  const finished = trainings.map((item) => {
    const finishedItem = item.finished;
    if (finishedItem[0]) {
      return item;
    }
  });

  const expired = trainings.map((item) => {
    const finishedItem = item.finished;
    const datePublished = new Date(item.date_published);
    const date = new Date(new Date().setHours(0, 0, 0, 0));
    if (!finishedItem[0] && datePublished.getTime() < date.getTime()) {
      return item;
    }
  });

  const nextTraining = trainings.map((item) => {
    const datePublished = new Date(item.date_published);
    if (curretTraining) {
      const date = new Date(new Date(curretTraining.date_published).setHours(0, 0, 0, 0));
      if (datePublished.getTime() > date.getTime()) return item;
    }
  });

  const renderTitle = <Typography variant="h4">Meus treinos</Typography>;
  const renderContent = (
    <>
      <Stack direction="row" spacing={1}>
        <Chip label="Finalizados" color="primary" />
        <Chip label="Vencidos" color="error" />
        <Chip label="Próximos" color="warning" />
      </Stack>
      <Stack sx={{ height: '50vh', overflow: 'hidden' }}>
        <Scrollbar>
          <Stack spacing={2}>
            {curretTraining && <CurrentTraining currentTraining={curretTraining} />}
            <Finished finalized={finished.filter((item) => item)} />
            <Expired expired={expired.filter((item) => item)} />
            <NextTraining trainings={nextTraining.filter((item) => item)} />
          </Stack>
        </Scrollbar>
      </Stack>
    </>
  );

  const closestDate = useCallback(() => {
    const temp = trainings.map((training) => {
      return Math.abs(
        new Date().setHours(0, 0, 0, 0) -
          new Date(new Date(training.date_published).setHours(0, 0, 0, 0)).getTime(),
      );
    });
    const idx = temp.indexOf(Math.min(...temp));
    setCurretTraining(trainings[idx]);
  }, []);

  const formatedData = () => {
    const data = Object.assign([], trainings);
    const newData = [];
    for (var key in data) {
      newData.push({
        id: data[key].id,
        allDay: true,
        color: '#00B8D9',
        description: data[key].description,
        start: data[key].date_published,
        end: data[key].training_date_other
          ? data[key].training_date_other
          : data[key].date_published,
        title: data[key].name,
      });
    }
  };

  useEffect(() => {
    if (trainings) {
      closestDate();
      formatedData();
    }
  }, [trainings]);

  return <Calendar />;
}
