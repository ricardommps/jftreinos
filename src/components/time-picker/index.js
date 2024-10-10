import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const TimePickerDialog = ({ open, handleClose }) => {
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedSecond, setSelectedSecond] = useState('00');

  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minuteSecondOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // Estilos customizados para o dropdown
  const selectStyle = {
    minWidth: 80, // Ajuste para deixar o dropdown menor
    height: 40, // Definindo a altura do seletor
  };

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 200, // Define a altura máxima da lista suspensa
      },
    },
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Definir meta (h:m:s)</DialogTitle>

      <Grid container justifyContent="center" spacing={2}>
        {/* Picker de Horas */}
        <Grid item>
          <Select
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            style={selectStyle}
            MenuProps={menuProps}
          >
            {hourOptions.map((hour) => (
              <MenuItem key={hour} value={hour}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Separador */}
        <Grid item>
          <Typography variant="h5">:</Typography>
        </Grid>

        {/* Picker de Minutos */}
        <Grid item>
          <Select
            value={selectedMinute}
            onChange={(e) => setSelectedMinute(e.target.value)}
            style={selectStyle}
            MenuProps={menuProps}
          >
            {minuteSecondOptions.map((minute) => (
              <MenuItem key={minute} value={minute}>
                {minute}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Separador */}
        <Grid item>
          <Typography variant="h5">:</Typography>
        </Grid>

        {/* Picker de Segundos */}
        <Grid item>
          <Select
            value={selectedSecond}
            onChange={(e) => setSelectedSecond(e.target.value)}
            style={selectStyle}
            MenuProps={menuProps}
          >
            {minuteSecondOptions.map((second) => (
              <MenuItem key={second} value={second}>
                {second}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={() => {
            handleClose();
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimePickerDialog;
