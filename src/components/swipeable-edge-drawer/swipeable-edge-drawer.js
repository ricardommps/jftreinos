import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { alpha, styled, useTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';

const drawerBleeding = 55;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(() => ({
  backgroundColor: '#000000',
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'dark' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function SwipeableEdgeDrawer(props) {
  const { window, open, onOpen, onClose, title, children } = props;
  const theme = useTheme();

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,

            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.grey[500], 0.24)}` }}>
            <Typography sx={{ pt: 2 }}>{title}</Typography>
          </Box>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            pt: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          {children}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
