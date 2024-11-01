import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import React from 'react';

import WorkoutViewGroupItem from './workout-view-group-item';

export default function WorkoutViewGroup({ media, exerciseInfo }) {
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
        {media.map((subMedia, index) => (
          <React.Fragment key={index}>
            <WorkoutViewGroupItem media={subMedia} exerciseInfo={exerciseInfo} />
          </React.Fragment>
        ))}
      </Paper>
    </>
  );
}
