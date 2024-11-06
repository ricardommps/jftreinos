import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify/iconify';
import { useBoolean } from 'src/hooks/use-boolean';

import MediaDetails from '../medias/media-details';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListContent,
  ListItem,
  TextColum,
  Title,
} from '../styles';

export default function WorkoutViewItem({ media, exerciseInfo, workoutLoad }) {
  const exerciseInfoById = exerciseInfo?.filter((item) => item.id === media.id)[0];
  const details = useBoolean();
  return (
    <>
      <ListContent>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              sx={{ width: 80, height: 80, marginLeft: 1 }}
              variant="square"
              alt="Remy Sharp"
              src={media?.thumbnail || 'https://supertreinosapp.com/img/TREINO-BANNER-PADRAO.jpg'}
            />
          </ListItemAvatar>
          <TextColum>
            <Stack direction="row" alignItems={'center'}>
              <Title sx={{ flex: 1 }}>{media.title}</Title>
              <IconButton sx={{ paddingRight: 2 }} onClick={details.onTrue}>
                <Iconify icon="mdi:eye" width={20} />
              </IconButton>
            </Stack>
          </TextColum>
        </ListItem>
        <>
          {exerciseInfoById && (
            <Accordion sx={{ marginLeft: 1, marginRight: 1 }}>
              <AccordionSummary
                aria-controls="heationg-content"
                id="heationg-header"
                sx={{ fontSize: '0.8rem' }}
              >
                Informações do exercício
              </AccordionSummary>
              <AccordionDetails>
                <Stack flexDirection={'row'}>
                  <Stack spacing={1}>
                    {exerciseInfoById?.method && exerciseInfoById?.method.length > 0 && (
                      <Stack>
                        <Typography
                          sx={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            color: 'text.secondary',
                          }}
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
                          sx={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            color: 'text.secondary',
                          }}
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
                          sx={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            color: 'text.secondary',
                          }}
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
                          sx={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            color: 'text.secondary',
                          }}
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
                          sx={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            color: 'text.secondary',
                          }}
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
              </AccordionDetails>
            </Accordion>
          )}
        </>
      </ListContent>
      {details.value && (
        <MediaDetails
          open={details.value}
          onClose={details.onFalse}
          media={media}
          exerciseInfo={exerciseInfo}
          isWorkoutLoad={workoutLoad}
        />
      )}
    </>
  );
}
