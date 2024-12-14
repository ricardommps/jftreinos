import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import WorkoutItem from './workout-item';
import WorkoutViewGroup from './workout-view-group';

export default function WorkoutView({ medias, mediaOrder, exerciseInfo, type, workoutLoad }) {
  return (
    <Box sx={{ p: 0 }}>
      <Stack spacing={2}>
        {mediaOrder.map((orderItem, index) => {
          if (Array.isArray(orderItem)) {
            const groupedMedias = orderItem
              .map((id) => medias.find((media) => media.id === id))
              .filter((media) => !!media);
            if (groupedMedias?.length > 0) {
              return (
                <WorkoutViewGroup
                  key={`group-${index}`}
                  media={groupedMedias}
                  exerciseInfo={exerciseInfo}
                  workoutLoad={workoutLoad}
                />
              );
            }
          } else {
            const media = medias.find((m) => m.id === orderItem);
            if (media?.id) {
              return (
                <WorkoutItem
                  key={media.id}
                  media={media}
                  exerciseInfo={exerciseInfo}
                  workoutLoad={workoutLoad}
                />
              );
            }
          }
        })}
      </Stack>
    </Box>
  );
}
