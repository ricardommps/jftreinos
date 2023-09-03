import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import { ExtrapolativeValidityDialog } from './extrapolative-validity-dialog';

const currentExtrapolation = {
  VO2: '38,5',
  '800 m': "3'52",
  '1000 m': "5'08",
  '1500 m': "8'46",
  '2km': "12'22",
  '3 km': "19'50",
  '5 km': "35'02",
  '10 km': "1h23'08",
  '15 km': "2h10'06",
  '20 km': "2h58'38",
  '30 km': "5h19'24",
  '42.1 km': "8h29'26",
};

const getExtrapolationRender = (extrapolationItem) => {
  const item = Object.keys(extrapolationItem);
  delete item[0];
  return item;
};

export default function ExtrapolativeValidity({ open, onClose }) {
  return (
    <ExtrapolativeValidityDialog open={open} onClose={onClose}>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {getExtrapolationRender(currentExtrapolation).map((item, index) => (
          <Stack key={index} spacing={1.5} direction="row">
            <ListItemText
              primary={item}
              secondary={currentExtrapolation[item]}
              primaryTypographyProps={{
                typography: 'body2',
                color: 'text.secondary',
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 0.5,
              }}
              secondaryTypographyProps={{
                typography: 'subtitle2',
                textAlign: 'center',
                component: 'span',
              }}
            />
          </Stack>
        ))}
      </Box>
    </ExtrapolativeValidityDialog>
  );
}
