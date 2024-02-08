import { useEffect } from 'react';

import Calendar from './calendar/calendar';
export default function TrainingsList({ trainings }) {
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
        subtitle: data[key].subtitle,
      });
    }
  };

  useEffect(() => {
    if (trainings) {
      formatedData();
    }
  }, [trainings]);

  return <Calendar />;
}
