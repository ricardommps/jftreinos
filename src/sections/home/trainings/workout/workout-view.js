import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Scrollbar from 'src/components/scrollbar';

import WorkoutViewGroup from './workout-view-group';
import WorkoutViewItem from './workout-view-item';

export default function WorkoutView({ medias, mediaOrder, exerciseInfo, type, workoutLoad }) {
  return (
    <Box sx={{ p: 1, overflow: 'hidden' }}>
      <Scrollbar sx={{ height: 320 }}>
        <Stack spacing={2}>
          {mediaOrder.map((orderItem, index) => {
            if (Array.isArray(orderItem)) {
              const groupedMedias = medias.filter((media) => orderItem.includes(media.id));
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
                  <WorkoutViewItem
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
      </Scrollbar>
    </Box>
  );
}
