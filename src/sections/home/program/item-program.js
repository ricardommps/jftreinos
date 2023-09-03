import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';

export default function ItemProgram({ notActive, title, onView }) {
  console.log('----->>', title, notActive);
  const popover = usePopover();
  const renderBanner = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Image
          alt={'banner'}
          src={`/assets/banners/banner-run.png`}
          sx={{ borderRadius: 1, height: 164, width: 1, opacity: notActive && 0.3 }}
        />
      </Stack>
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      primary={`Mês de referencia: setembro/2023`}
      secondary={title}
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: notActive ? 'text.disabled' : 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      {!notActive && (
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      )}

      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ typography: 'body2', color: notActive ? 'text.disabled' : 'text.primary' }}
      >
        PV: 11
      </Stack>
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ typography: 'body2', color: notActive ? 'text.disabled' : 'text.primary' }}
      >
        Pace: 8
      </Stack>
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ typography: 'body2', color: notActive ? 'text.disabled' : 'text.primary' }}
      >
        Total de treinos: 11
      </Stack>
    </Stack>
  );
  return (
    <>
      <Card>
        {renderBanner}
        {renderTexts}
        {renderInfo}
      </Card>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
      </CustomPopover>
    </>
  );
}
