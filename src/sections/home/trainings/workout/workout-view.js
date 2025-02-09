import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';

import WorkoutItem from './workout-item';
import WorkoutViewGroup from './workout-view-group';

export default function WorkoutView({
  medias,
  mediaOrder,
  exerciseInfo,
  isWorkoutLoad,
  handleCheckList,
  checkList,
}) {
  // Memoiza o processamento do mediaOrder para evitar re-renders desnecessários
  const orderedMedias = useMemo(() => {
    return mediaOrder.map((orderItem) => {
      if (Array.isArray(orderItem)) {
        return orderItem.map((id) => medias.find((media) => media.id === id)).filter(Boolean);
      } else {
        return medias.find((m) => m.id === orderItem) || null;
      }
    });
  }, [medias, mediaOrder]);

  return (
    <Box sx={{ p: 0 }} className="notranslate">
      <Stack spacing={2}>
        {orderedMedias.map((mediaGroup, index) => {
          if (Array.isArray(mediaGroup) && mediaGroup.length > 0) {
            return (
              <WorkoutViewGroup
                key={`group-${index}`}
                media={mediaGroup}
                exerciseInfo={exerciseInfo}
                isWorkoutLoad={isWorkoutLoad}
                handleCheckList={handleCheckList}
                checkList={checkList}
              />
            );
          } else if (mediaGroup) {
            return (
              <WorkoutItem
                key={mediaGroup.id}
                media={mediaGroup}
                exerciseInfo={exerciseInfo}
                isWorkoutLoad={isWorkoutLoad}
                handleCheckList={handleCheckList}
                checkList={checkList}
              />
            );
          }
          return null; // Evita retornos undefined
        })}
      </Stack>
    </Box>
  );
}
