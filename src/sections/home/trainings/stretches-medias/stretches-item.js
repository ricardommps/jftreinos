import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'src/hooks/use-boolean';

import StretchesDetails from './stretches-details';

const Footer = styled('div')(() => ({
  margin: '2px 10px',
  borderRadius: '0 0 8px 8px',
  fontSize: '.7rem',
  padding: '2px 10px 5px',
  '& span': {
    display: 'block',
    margin: '0 auto',
    textAlign: 'left',
    position: 'relative',
    fontStyle: 'normal',
    padding: '0 0 0 20px',
  },
}));
export default function StretcheItem({ media, exerciseInfo }) {
  const details = useBoolean();
  const exerciseInfoById = exerciseInfo?.filter(
    (item) => item.id === media.id || item.mediaId === media.id,
  )[0];
  return (
    <Card sx={{ marginBottom: 3 }}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" onClick={details.onTrue}>
            <ArrowForwardIosIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar
            sx={{ width: 60, height: 60 }}
            variant="square"
            alt="Remy Sharp"
            src={media?.thumbnail || 'https://supertreinosapp.com/img/TREINO-BANNER-PADRAO.jpg'}
          />
        </ListItemAvatar>
        <ListItemText primary={media.title} />
      </ListItem>
      <Footer>
        <Stack flexDirection={'row'}>
          <Stack spacing={1}>
            {exerciseInfoById?.method && exerciseInfoById?.method.length > 0 && (
              <Stack>
                <Typography
                  sx={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}
                >
                  MÉTODO:
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'text.primary',
                  }}
                >
                  {exerciseInfoById?.method}
                </Typography>
              </Stack>
            )}
            {exerciseInfoById?.reps && exerciseInfoById?.reps.length > 0 && (
              <Stack>
                <Typography
                  sx={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}
                >
                  RANGE DE REPETIÇÕES:
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'text.primary',
                  }}
                >
                  {exerciseInfoById?.reps}
                </Typography>
              </Stack>
            )}
            {exerciseInfoById?.reset > 0 && (
              <Stack>
                <Typography
                  sx={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}
                >
                  INTERVALO DE RECUPERAÇÃO:
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'text.primary',
                  }}
                >
                  {exerciseInfoById?.reset}
                </Typography>
              </Stack>
            )}
            {exerciseInfoById?.rir && exerciseInfoById?.rir.length > 0 && (
              <Stack>
                <Typography
                  sx={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}
                >
                  repetições de reserva
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'text.primary',
                  }}
                >
                  {exerciseInfoById?.rir}
                </Typography>
              </Stack>
            )}
            {exerciseInfoById?.cadence && exerciseInfoById?.cadence.length > 0 && (
              <Stack>
                <Typography
                  sx={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'text.secondary' }}
                >
                  Cadência / Vel. de mov.:
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'text.primary',
                  }}
                >
                  {exerciseInfoById?.cadence}
                </Typography>
              </Stack>
            )}
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
        </Stack>
      </Footer>
      {details.value && (
        <StretchesDetails
          open={details.value}
          onClose={details.onFalse}
          media={media}
          exerciseInfo={exerciseInfo}
        />
      )}
    </Card>
  );
}
