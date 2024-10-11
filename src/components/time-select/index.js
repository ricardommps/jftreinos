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
import { useEffect, useState } from 'react';

const TimeSelect = ({ visible, onClose, onSave, initialValue = 0 }) => {
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedSeconds, setSelectedSeconds] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (visible) {
      // Converte o valor inicial (em segundos) para horas, minutos e segundos
      const initialHours = Math.floor(initialValue / 3600);
      const initialMinutes = Math.floor((initialValue % 3600) / 60);
      const initialSeconds = initialValue % 60;

      setSelectedHours(initialHours);
      setSelectedMinutes(initialMinutes);
      setSelectedSeconds(initialSeconds);

      setForceUpdate((prev) => prev + 1);
    }
  }, [visible, initialValue]);

  const hours = Array.from({ length: 24 }, (_, i) => ({
    label: i.toString().padStart(2, '0'), // Adiciona '0' para valores entre 0 e 9
    value: i,
  }));

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i,
  }));

  const seconds = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i,
  }));

  const handleOk = () => {
    // Converte a seleção de horas, minutos e segundos para um total em segundos
    const totalSeconds = selectedHours * 3600 + selectedMinutes * 60 + selectedSeconds;

    onSave(totalSeconds.toString()); // Salva o valor em segundos
  };

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
    <Dialog open={visible} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Definir tempo (hh:mm:ss)</DialogTitle>

      <Grid container justifyContent="center" spacing={2}>
        {/* Picker de Horas */}
        <Grid item>
          <Select
            value={selectedHours}
            onChange={(e) => setSelectedHours(e.target.value)}
            style={selectStyle}
            MenuProps={menuProps}
            key={`pickerHours-${forceUpdate}`}
          >
            {hours.map((hour) => (
              <MenuItem key={`selectHour-${hour.value}`} value={hour.value}>
                {hour.label}
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
            value={selectedMinutes}
            onChange={(e) => setSelectedMinutes(e.target.value)}
            style={selectStyle}
            MenuProps={menuProps}
            key={`pickerMinutes-${forceUpdate}`}
          >
            {minutes.map((minute) => (
              <MenuItem key={`selectMinute-${minute.value}`} value={minute.value}>
                {minute.label}
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
            value={selectedSeconds}
            onChange={(e) => setSelectedSeconds(e.target.value)}
            style={selectStyle}
            MenuProps={menuProps}
            key={`pickerSeconds-${forceUpdate}`}
          >
            {seconds.map((second) => (
              <MenuItem key={`selectSecond-${second.value}`} value={second.value}>
                {second.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <DialogActions>
        <Button onClick={() => onClose()}>Cancelar</Button>
        <Button onClick={handleOk}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimeSelect;
