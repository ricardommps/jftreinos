// @mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Image from 'src/components/image/image';

import { AccountPopover } from '../_common';

export default function Header() {
  const renderContent = (
    <>
      <Image
        disabledEffect
        alt={'home'}
        src={`/assets/logo/logo-header.png`}
        style={{ width: 'auto', height: 40 }}
      />
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
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
