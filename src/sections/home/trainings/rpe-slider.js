import Box from '@mui/material/Box';
import Slider, { SliderThumb } from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Controller } from 'react-hook-form';
import { useResponsive } from 'src/hooks/use-responsive';

export default function RPSSlider({ control }) {
  const mdUp = useResponsive('up', 'md');
  const renderIcon = (value) => {
    if (value < 3) {
      return '/assets/sliderIcons/ico-very-happy.svg';
    }
    if (value == 3) {
      return '/assets/sliderIcons/ico-happy.svg';
    }

    if (value < 7 && value > 3) {
      return '/assets/sliderIcons/ico-neutral.svg';
    }

    if (value < 10 && value > 6) {
      return '/assets/sliderIcons/ico-sad.svg';
    }

    if (value === 10) {
      return '/assets/sliderIcons/ico-very-sad.svg';
    }

    return '/assets/sliderIcons/ico-happy.svg';
  };

  const renderLabel = (value, label, color) => {
    return (
      <Box
        display="flex"
        width={'250px'}
        height={40}
        bgcolor={color}
        alignItems="center"
        justifyContent="flex-start"
        paddingLeft={'10px'}
        color="black"
      >
        <Typography fontWeight="bold" width={'210px'}>
          {label}
        </Typography>
        <Box component="img" src={renderIcon(value)} sx={{ width: 24, height: 24 }} />
      </Box>
    );
  };

  const marks = [
    {
      value: 0,
      label: renderLabel(0, '0 Repouso', '#fff'),
    },
    {
      value: 1,
      label: renderLabel(1, '1 Muito Leve', '#fff59d'),
    },
    {
      value: 2,
      label: renderLabel(2, '2 Leve', '#fff59d'),
    },
    {
      value: 3,
      label: renderLabel(3, '3 Moderado', '#ffeb3b'),
    },
    {
      value: 4,
      label: renderLabel(4, '4 Um pouquinho pesado', '#fbc02d'),
    },
    {
      value: 5,
      label: renderLabel(5, '5 Pesado', '#fbc02d'),
    },
    {
      value: 6,
      label: renderLabel(6, '6', '#fbc02d'),
    },
    {
      value: 7,
      label: renderLabel(7, '7 Muito pesado', '#f57f17'),
    },
    {
      value: 8,
      label: renderLabel(8, '8', '#f57f17'),
    },
    {
      value: 9,
      label: renderLabel(9, '9', '#f57f17'),
    },
    {
      value: 10,
      label: renderLabel(10, '10 Extremamente pesado', '#dd2c00'),
    },
  ];

  function ThumbComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </SliderThumb>
    );
  }

  return (
    <Stack
      p={(5, 0)}
      sx={{
        border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.5)}`,
        width: '100%',
      }}
    >
      <Stack mt={2}>
        <Typography textAlign={'center'} variant="subtitle1" component={'p'}>
          Escala CR-10 de borg
        </Typography>
        <Typography textAlign={'center'} variant="subtitle2" component={'p'}>
          Percepção de esforço
        </Typography>
      </Stack>
      <Stack mb={5} mt={2} ml={mdUp ? '10%' : '0'}>
        <Controller
          control={control}
          name="rpe"
          render={({ field: { value, onChange } }) => (
            <Slider
              onChange={onChange}
              value={value}
              slots={{ thumb: ThumbComponent }}
              getAriaLabel={() => 'Temperature'}
              orientation="vertical"
              defaultValue={0}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              marks={marks}
              sx={{ height: '370px', marginTop: '25px' }}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}
