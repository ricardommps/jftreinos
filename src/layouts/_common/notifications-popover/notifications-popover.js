'use client';

import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
// @mui
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import { useCallback, useEffect } from 'react';
// _mock
import { varHover } from 'src/components/animate';
import EmptyContent from 'src/components/empty-content';
import Iconify from 'src/components/iconify';
import LoadingProgress from 'src/components/loading-progress';
// components
import Scrollbar from 'src/components/scrollbar';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import useANotifications from 'src/hooks/use-notifications';
import { useResponsive } from 'src/hooks/use-responsive';

//
import NotificationItem from './notification-item';

export default function NotificationsPopover() {
  const { onGetNotifications, notifications, notificationsStatus, readAt } = useANotifications();
  const drawer = useBoolean();

  const smUp = useResponsive('up', 'sm');

  const initialize = useCallback(async () => {
    onGetNotifications();
  }, []);

  const totalUnRead = notifications.filter((item) => !item.readAt).length;

  useEffect(() => {
    if (drawer.value) {
      initialize();
    }
  }, [drawer.value]);

  useEffect(() => {
    if (readAt) {
      onGetNotifications();
    }
  }, [readAt]);

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Nofiticações
      </Typography>

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </List>
    </Scrollbar>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />
        {notificationsStatus.loading ? (
          <LoadingProgress />
        ) : (
          <>
            {notificationsStatus.empty ? (
              <EmptyContent
                imgUrl="/assets/icons/empty/ic_content.svg"
                sx={{
                  borderRadius: 1.5,
                  bgcolor: 'background.default',
                  height: '50vh',
                }}
                title="Nenhuma notificação"
              />
            ) : (
              <>{renderList}</>
            )}
          </>
        )}
      </Drawer>
    </>
  );
}
