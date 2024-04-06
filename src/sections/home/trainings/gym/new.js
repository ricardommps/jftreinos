import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'src/hooks/use-boolean';

import GymDetails from './gym-details';
export default function GymList({ medias }) {
  const details = useBoolean();
  return (
    <>
      <Stack>
        <Stack alignItems={'center'}>Vídeos</Stack>
        <List>
          <Stack spacing={3}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={details.onTrue}>
                  <ArrowForwardIosIcon />
                </IconButton>
              }
            >
              <Typography pr={4}>1º</Typography>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  alt="Remy Sharp"
                  src="https://res.cloudinary.com/dtjwulffm/image/upload/v1701520486/mi6xncqkcmyr3bynnhn0.jpg"
                />
              </ListItemAvatar>
              <ListItemText primary="Atividade 1" />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={details.onTrue}>
                  <ArrowForwardIosIcon />
                </IconButton>
              }
            >
              <Typography pr={4}>2º</Typography>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  alt="Remy Sharp"
                  src="https://res.cloudinary.com/dtjwulffm/image/upload/v1701520617/j2mvjpvyawlnobr0p6qw.jpg"
                />
              </ListItemAvatar>
              <ListItemText primary="Atividade 3" />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={details.onTrue}>
                  <ArrowForwardIosIcon />
                </IconButton>
              }
            >
              <Typography pr={4}>3º</Typography>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  alt="Remy Sharp"
                  src="https://res.cloudinary.com/dtjwulffm/image/upload/v1701520618/xnu1bkdbelb913yv0qlb.jpg"
                />
              </ListItemAvatar>
              <ListItemText primary="Atividade 2" />
            </ListItem>
          </Stack>
        </List>
      </Stack>
      {details.value && <GymDetails open={details.value} onClose={details.onFalse} />}
    </>
  );
}
