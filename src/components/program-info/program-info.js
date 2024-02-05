import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatedPace } from 'src/utils/format-number';
export default function ProgramInfo({ historic }) {
  const renderTexts = (
    <ListItemText
      primary={historic.programname}
      secondary={format(new Date(historic.month), 'MMM/yyyy', { locale: ptBR })}
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
        textTransform: 'capitalize',
      }}
    />
  );

  const renderInfo = (
    <Stack
      pt={2}
      sx={{
        position: 'relative',
      }}
    >
      {historic.pv && (
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.primary' }}
        >
          {`PV: ${historic.pv}`}
        </Stack>
      )}
      {historic.programpace && (
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.primary' }}
        >
          {`Pace: ${formatedPace(historic.programpace)}`}
        </Stack>
      )}
      {historic.goal && (
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.primary' }}
        >
          {`Objetivo: ${historic.goal}`}
        </Stack>
      )}
      {historic.difficulty && (
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.primary' }}
        >
          {`Dificuldade: ${historic.difficulty}`}
        </Stack>
      )}
    </Stack>
  );
  return (
    <>
      {renderTexts}
      {renderInfo}
    </>
  );
}
