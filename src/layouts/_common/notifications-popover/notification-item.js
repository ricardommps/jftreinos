// @mui
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useFinished from 'src/hooks/use-finished';
import useANotifications from 'src/hooks/use-notifications';
import { RouterLink } from 'src/routes/components';
// components
// utils
import { fToNow } from 'src/utils/format-time';

import FeedBackView from './feedback-view';

// ----------------------------------------------------------------------

export default function NotificationItem({ notification }) {
  const { onReadAt, readAtStatus } = useANotifications();
  const { onClearFinishedState } = useFinished();
  const [finishedId, setFinishedId] = useState(null);
  const handleAccept = () => {
    onReadAt(notification.id);
  };

  const handleViewFeedBack = () => {
    setFinishedId(notification.link);
  };

  const handleCloseFeddBack = () => {
    setFinishedId(null);
    onClearFinishedState();
    handleAccept();
  };
  const renderAvatar = (
    <>
      {notification.type === 'invoice' && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 40,
            height: 40,
            aspectRatio: 1, // Garante que a proporção seja sempre 1:1
            borderRadius: '50%',

            marginRight: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={'/assets/icons/notification/ic_mail.svg'}
            sx={{ width: 24, height: 24, objectFit: 'contain' }}
          />
        </Stack>
      )}

      {notification.type === 'feedback' && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 40,
            height: 40,
            aspectRatio: 1, // Garante que a proporção seja sempre 1:1
            borderRadius: '50%',

            marginRight: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={'/assets/icons/notification/ic_chat.svg'}
            sx={{ width: 24, height: 24, objectFit: 'contain' }}
          />
        </Stack>
      )}
    </>
  );

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

  const paymentAction = (
    <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
      <Link
        component={RouterLink}
        href={`/dashboard${notification.link}`}
        onClick={handleAccept}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
      >
        Baixar comprovante
      </Link>
    </Stack>
  );

  const feedbackAction = (
    <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
      <Button size="small" variant="contained" onClick={handleViewFeedBack}>
        Ver Feedback
      </Button>
    </Stack>
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
      {!notification.readAt &&
        notification.type !== 'invoice' &&
        notification.type !== 'feedback' && (
          <LoadingButton
            size="small"
            variant="contained"
            onClick={handleAccept}
            loading={readAtStatus.loading}
          >
            Marcar como lido
          </LoadingButton>
        )}
    </Stack>
  );

  return (
    <>
      <ListItemButton
        disableRipple
        sx={{
          p: 2.5,
          alignItems: 'flex-start',
          borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {renderUnReadBadge}
        {renderAvatar}
        <Stack sx={{ flexGrow: 1 }}>
          {renderText}
          {content}
          {notification.type === 'invoice' && paymentAction}
          {notification.type === 'feedback' && feedbackAction}
        </Stack>
      </ListItemButton>
      {finishedId && (
        <FeedBackView id={finishedId} open={Boolean(finishedId)} onClose={handleCloseFeddBack} />
      )}
    </>
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
