import ShowChartIcon from '@mui/icons-material/ShowChart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import TextMaxLine from 'src/components/text-max-line';
import { fDate } from 'src/utils/format-time';
export const trainingModules = [
  { value: 'ALTERNANDO_RITMO', label: 'Alternando ritmo' },
  { value: 'COMPETICAO', label: 'Competição' },
  { value: 'CONTRARRELOGIO', label: 'Contrarrelógio' },
  { value: 'HIIT_CURTO', label: 'Hiit Curto', metrics: true },
  { value: 'HIITT_LONGO', label: 'Hiit Longo', metrics: true },
  { value: 'LL1', label: 'LL1' },
  { value: 'LL2_INTERVALADO', label: 'LL2 intervalado', metrics: true },
  { value: 'LL2_RITMADO', label: 'LL2 ritmado' },
  { value: 'LONGAO', label: 'Longão' },
  { value: 'PROGRASSIVO', label: 'Progressivo' },
  { value: 'RODAGEM', label: 'Rodagem' },
  { value: 'SPRINT', label: 'Sprint' },
  { value: 'TESTE_FISICO', label: 'Teste Físico' },
  { value: 'FORCA', label: 'Força' },
];

export default function MetricsItem({ row, handleOpenChart }) {
  const renderType = (type) => {
    switch (Number(type)) {
      case 1:
        return 'Desempenho';
      case 2:
        return 'Competição';
      case 3:
        return 'Parametros fisiológicos';
      default:
        return '';
    }
  };

  const getModuleName = (name) => {
    if (name) {
      const moduleName = trainingModules.filter((module) => module.value === name)[0];
      if (moduleName) {
        return moduleName.label;
      }
      return name;
    }
  };
  return (
    <>
      <Stack component={Card} direction="row">
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Label
              variant={'soft'}
              color={
                (Number(row.type) === 1 && 'success') ||
                (Number(row.type) === 2 && 'warning') ||
                (Number(row.type) === 3 && 'error') ||
                'default'
              }
            >
              <TextMaxLine persistent variant="subtitle2" line={1}>
                {renderType(row.type)}
              </TextMaxLine>
            </Label>

            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {fDate(row.createdAt)}
            </Box>
          </Stack>
          <Stack spacing={1} flexGrow={1}>
            <Typography>
              <TextMaxLine variant="subtitle2" line={1}>
                {row.title}
              </TextMaxLine>
              <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
                {getModuleName(row.module)}
              </TextMaxLine>
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" pt={2}>
            <Button
              variant="outlined"
              startIcon={<ShowChartIcon />}
              color="warning"
              onClick={() => handleOpenChart(row)}
            >
              Ver Gráfico
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
