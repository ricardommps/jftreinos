import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import { forwardRef } from 'react';

const TooltipRadio = forwardRef(function TooltipRadio(props, ref) {
  const {
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    inputProps,
    ...other
  } = props;

  return (
    <Radio
      ref={ref}
      {...other}
      inputProps={{
        ...inputProps,
        'aria-labelledby': ariaLabelledBy,
        'aria-label': ariaLabel,
      }}
    />
  );
});
const hues = [
  'red',
  'pink',
  'purple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'orange',
  'white',
  'black',
];

export default function ColorSelect({ color, onChangeColor }) {
  return (
    <Box sx={{ width: 192 }}>
      {hues.map((hue) => {
        const backgroundColor = hue;
        return (
          <Tooltip placement="right" title={hue} key={hue}>
            <TooltipRadio
              sx={{ p: 0 }}
              color="default"
              value={hue}
              checked={color === backgroundColor}
              onChange={() => onChangeColor(hue)}
              name={'primary'}
              icon={<Box sx={{ width: 48, height: 48 }} style={{ backgroundColor }} />}
              checkedIcon={
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    border: 1,
                    borderColor: color === 'white' ? 'black' : 'white',
                    color: color === 'white' ? 'common.black' : 'common.white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  style={{ backgroundColor }}
                >
                  <CheckIcon style={{ fontSize: 30 }} />
                </Box>
              }
            />
          </Tooltip>
        );
      })}
    </Box>
  );
}
