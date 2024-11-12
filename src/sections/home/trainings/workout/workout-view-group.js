import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import React from 'react';

import WorkoutViewGroupItem from './workout-view-group-item';

export default function WorkoutViewGroup({ media, exerciseInfo, workoutLoad }) {
  const handleType = () => {
    if (media.length === 2) {
      return 'BISET';
    }

    if (media.length === 3) {
      return 'TRISET';
    }

    return 'CIRCUITO';
  };
  return (
    <>
      <Paper
        variant="outlined"
        pb={2}
        sx={{
          marginBottom: '8.25px',
          paddingTop: '10px',
          paddingRight: '10px',
          paddingLeft: '10px',
          borderRadius: 1.5,
          borderStyle: 'dashed',
          borderColor: (theme) => alpha(theme.palette.grey[300], 0.5),
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        }}
      >
        <Box justifyContent="flex-start" display="flex" p={1} gap={2}>
          <Chip label={handleType()} color="info" />
        </Box>
        {media.map((subMedia, index) => (
          <React.Fragment key={index}>
            <WorkoutViewGroupItem
              media={subMedia}
              exerciseInfo={exerciseInfo}
              workoutLoad={workoutLoad}
            />
          </React.Fragment>
        ))}
      </Paper>
    </>
  );
}
