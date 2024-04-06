import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { useBoolean } from 'src/hooks/use-boolean';

import MediaDetails from './media-details';
export default function MediaItem({ media, exerciseInfo }) {
  const details = useBoolean();
  return (
    <>
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
      {details.value && (
        <MediaDetails
          open={details.value}
          onClose={details.onFalse}
          media={media}
          exerciseInfo={exerciseInfo}
        />
      )}
    </>
  );
}
