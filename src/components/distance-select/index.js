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

const DistanceSelect = ({ visible, onClose, onSave, initialValue = 1000, title }) => {
  const [selectedKmIndex, setSelectedKmIndex] = useState(0);
  const [selectedMeterIndex, setSelectedMeterIndex] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (visible) {
      const initialKm = Math.floor(initialValue / 100);
      const initialMeters = initialValue % 100; // Pegue os metros diretamente do valor

      setSelectedKmIndex(initialKm);
      setSelectedMeterIndex(initialMeters);

      setForceUpdate((prev) => prev + 1);
    }
  }, [visible, initialValue]);

  // Criar uma lista de quilômetros de 0 a 99
  const kilometers = Array.from({ length: 100 }, (_, i) => ({
    label: i.toString().padStart(2, '0'), // Adiciona '0' na frente para valores entre 0 e 9
    value: i,
  }));

  // Metros de 0 a 99, onde o valor real é multiplicado por 10
  const meters = Array.from({ length: 100 }, (_, i) => ({
    label: i.toString().padStart(2, '0'), // Formata como 00, 01, 02, ..., 99
    value: i, // Cada valor já é diretamente o número de metros
  }));

  const handleOk = () => {
    // Converte as seleções de volta para metros, onde selectedMeterIndex é multiplicado por 10
    const totalMeters = selectedKmIndex * 100 + selectedMeterIndex;
    onSave(totalMeters.toString()); // Salva o valor correto em metros
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
      <DialogTitle>{title}</DialogTitle>

      <Grid container justifyContent="center" spacing={2}>
        {/* Picker de Quilômetros */}
        <Grid item>
          <Select
            value={selectedKmIndex}
            onChange={(e) => setSelectedKmIndex(e.target.value)}
            style={selectStyle}
            MenuProps={menuProps}
            key={`pickerOne-${forceUpdate}`}
          >
            {kilometers.map((km) => (
              <MenuItem key={`selectOne-${km.value}`} value={km.value}>
                {km.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Separador */}
        <Grid item>
          <Typography variant="h5">:</Typography>
        </Grid>

        {/* Picker de Metros */}
        <Grid item>
          <Select
            key={`pickerTwo-${forceUpdate}`}
            value={selectedMeterIndex}
            onChange={(e) => setSelectedMeterIndex(e.target.value)}
            style={selectStyle}
            MenuProps={menuProps}
          >
            {meters.map((meter) => (
              <MenuItem key={`selectTwo-${meter.value}`} value={meter.value}>
                {meter.label}
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

export default DistanceSelect;
