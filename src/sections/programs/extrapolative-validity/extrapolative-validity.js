import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import { ExtrapolativeValidityDialog } from './extrapolative-validity-dialog';

const getExtrapolationRender = (extrapolationItem) => {
  const item = Object.keys(extrapolationItem);
  delete item[0];
  return item;
};

export default function ExtrapolativeValidity({ open, onClose, currentExtrapolation }) {
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
        {currentExtrapolation &&
          getExtrapolationRender(currentExtrapolation).map((item, index) => (
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
