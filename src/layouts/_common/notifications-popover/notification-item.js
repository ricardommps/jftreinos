// @mui
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import useANotifications from 'src/hooks/use-notifications';
// components
// utils
import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function NotificationItem({ notification }) {
  const { onReadAt, readAtStatus } = useANotifications();
  const handleAccept = () => {
    onReadAt(notification.id);
  };

  const renderText = (
    <ListItemText
      disableTypography
      primary={reader(notification.title)}
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{ width: 2, height: 2, bgcolor: 'currentColor', mx: 0.5, borderRadius: '50%' }}
            />
          }
        >
          {fToNow(notification.createdAt)}
        </Stack>
      }
    />
  );

  const renderUnReadBadge = !notification.readAt && (
    <Box
      sx={{
        top: 26,
        width: 8,
        height: 8,
        right: 20,
        borderRadius: '50%',
        bgcolor: 'warning.main',
        position: 'absolute',
      }}
    />
  );

  const content = (
    <Stack alignItems="flex-start">
      <Box
        sx={{
          p: 1.5,
          my: 1.5,
          borderRadius: 1.5,
          color: 'text.secondary',
          bgcolor: 'background.neutral',
        }}
      >
        {notification.content}
      </Box>
      {!notification.readAt && (
        <LoadingButton
          size="small"
          variant="contained"
          onClick={handleAccept}
          loading={readAtStatus.loading}
        >
          Aceitar
        </LoadingButton>
      )}
    </Stack>
  );

  return (
    <ListItemButton
      disableRipple
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      {renderUnReadBadge}

      <Stack sx={{ flexGrow: 1 }}>
        {renderText}
        {content}
      </Stack>
    </ListItemButton>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.object,
};

// ----------------------------------------------------------------------

function reader(data) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  );
}
