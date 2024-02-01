import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
export default function HistoricFilter({ period, setPeriod }) {
  return (
    <Stack p={2} justifyContent={'center'}>
      <Typography textAlign={'center'} variant="h6">
        Período
      </Typography>
      <Stack spacing={1} direction="row" p={2} justifyContent={'center'}>
        <Button variant={period === 15 ? 'contained' : 'outlined'} onClick={() => setPeriod(15)}>
          15 dias
        </Button>
        <Button variant={period === 30 ? 'contained' : 'outlined'} onClick={() => setPeriod(30)}>
          30 dias
        </Button>
        <Button variant={period === 90 ? 'contained' : 'outlined'} onClick={() => setPeriod(90)}>
          90 dias
        </Button>
        <Button variant={period === 120 ? 'contained' : 'outlined'} onClick={() => setPeriod(120)}>
          120 dias
        </Button>
      </Stack>
    </Stack>
  );
}
