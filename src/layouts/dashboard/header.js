// @mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useEffect } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import Image from 'src/components/image/image';
import useANotifications from 'src/hooks/use-notifications';

import { AccountPopover, NotificationsPopover } from '../_common';

export default function Header() {
  const { onGetNotifications } = useANotifications();
  const { user } = useAuthContext();
  useEffect(() => {
    onGetNotifications();
  }, []);

  const renderContent = (
    <>
      <Image
        disabledEffect
        alt={'home'}
        src={`/assets/logo/joana.png`}
        style={{ width: 'auto', height: 30 }}
        width={'auto'}
      />
      {user?.isYoungLife && (
        <Image
          disabledEffect
          alt={'home'}
          src={`/assets/logo/younglife.png`}
          style={{ width: 'auto', height: 45 }}
          pl={1}
          width={'auto'}
        />
      )}

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <NotificationsPopover />
        <AccountPopover />
      </Box>
    </>
  );

  return (
    <AppBar position="fixed" color="primary" sx={{ padding: '5px 0' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>{renderContent}</Toolbar>
    </AppBar>
  );
}
