import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getModuleName } from 'src/utils/modules';

export default function TrainingInfo({ historic }) {
  const renderTexts = (
    <ListItemText
      primary={getModuleName(historic.trainingname)}
      secondary={
        <>
          <Typography>
            {format(new Date(historic.trainingdatepublished), 'dd/MM/yyyy', { locale: ptBR })}
          </Typography>
          <Typography>
            {historic.typetraining && `${historic.typetraining} - `}{' '}
            {historic.unitmeasurement && historic.unitmeasurement === 'pace' ? 'min' : 'km/h'}
          </Typography>
        </>
      }
      primaryTypographyProps={{
        typography: 'h6',
        color: 'text.primary',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle2',
      }}
    />
  );
  const renderInfo = (
    <Box pt={2}>
      <Typography>Descrição</Typography>
      <Typography sx={{ whiteSpace: 'pre-line' }} pt={1}>
        {historic.trainingdesc}
      </Typography>
    </Box>
  );
  return (
    <>
      {renderTexts}
      {renderInfo}
    </>
  );
}
