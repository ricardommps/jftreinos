import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useEffect, useMemo, useState } from 'react';

import WorkoutNewViewGroup from '../workoutsNew/workout-new-view-group';
import WorkoutItem from './workout-item';

export default function WorkoutView({ medias = [], mediaOrder = [], mediaInfo, isWorkoutLoad }) {
  const [isMounted, setIsMounted] = useState(false);
  const mediaMap = useMemo(() => {
    const map = new Map();

    if (medias && medias.length > 0) {
      medias.forEach((mediaGroup) => {
        if (Array.isArray(mediaGroup)) {
          mediaGroup.forEach((mediaItem) => {
            if (mediaItem && mediaItem.id) {
              map.set(mediaItem.id.toString(), mediaItem);
            }
          });
        }
      });
    }

    return map;
  }, [medias]);

  const organizedMedia = useMemo(() => {
    if (!mediaOrder || mediaOrder.length === 0 || !mediaMap.size) {
      return medias;
    }

    return mediaOrder
      .map((orderItem) => {
        if (Array.isArray(orderItem)) {
          const groupItems = orderItem
            .map((id) => mediaMap.get(id ? id.toString() : ''))
            .filter(Boolean);

          return groupItems.length > 0 ? groupItems : null;
        } else {
          const mediaItem = mediaMap.get(orderItem ? orderItem.toString() : '');
          return mediaItem ? [mediaItem] : null;
        }
      })
      .filter(Boolean);
  }, [mediaMap, mediaOrder]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <Box sx={{ p: 0 }}>
      <Stack spacing={2}>
        {organizedMedia.map((item, itemIndex) => {
          if (item.length > 1) {
            return (
              <WorkoutNewViewGroup
                key={`group-box-${itemIndex}`}
                media={item}
                mediaInfo={mediaInfo}
                isWorkoutLoad={isWorkoutLoad}
              />
            );
          } else {
            return (
              <WorkoutItem media={item[0]} mediaInfo={mediaInfo} isWorkoutLoad={isWorkoutLoad} />
            );
          }
        })}
      </Stack>
    </Box>
  );
}
