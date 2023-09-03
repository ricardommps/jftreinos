import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import Slider, { SliderThumb } from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useResponsive } from 'src/hooks/use-responsive';

export default function FinishTraining({ open, onClose }) {
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
    <Dialog fullScreen={!mdUp} fullWidth maxWidth="xs" open={open}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> Finalizar Treino</DialogTitle>
      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <Stack>
          <ListItemText
            sx={{ mb: 1 }}
            primary={`HIIT 1:1`}
            secondary={'01/09/2023'}
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'subtitle2',
              color: 'text.disabled',
            }}
          />
        </Stack>
        <Stack pt={2}>
          <Typography>Dados do treino</Typography>
          <Stack>
            <TextField
              fullWidth
              id="standard-required"
              label="Distância em Km/h"
              variant="standard"
            />
          </Stack>
          <Stack>
            <TextField fullWidth id="standard-required" label="Tempo total" variant="standard" />
          </Stack>
          <Stack>
            <TextField fullWidth id="standard-required" label="Pace" variant="standard" />
          </Stack>
          <Stack>
            <TextField fullWidth id="standard-required" label="Link" variant="standard" />
          </Stack>
          <Stack pt={2}>
            <Typography>Trimp: xxx</Typography>
          </Stack>
        </Stack>
        <Stack pt={5}>
          <Slider
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
        </Stack>
        <Stack pt={5}>
          <TextField id="outlined-multiline-static" label="Observação" multiline rows={4} />
        </Stack>
        <Stack pt={5}>
          <Button variant="contained" onClick={onClose}>
            Salvar
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
