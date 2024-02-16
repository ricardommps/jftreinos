import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ColorSelect from 'src/components/color/color-select';

export default function SelectBgColor({ bgClorPopover, bgColor, setBgColor }) {
  return (
    <Popover
      open={Boolean(bgClorPopover.open)}
      anchorEl={bgClorPopover.open}
      onClose={bgClorPopover.onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box sx={{ p: 2, maxWidth: 480 }}>
        <Stack>
          <IconButton
            aria-label="close"
            onClick={bgClorPopover.onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack pt={3}>
          <Typography variant="subtitle1" gutterBottom>
            Selecione uma cor para Background
          </Typography>
          <ColorSelect color={bgColor} onChangeColor={setBgColor} />
        </Stack>
      </Box>
    </Popover>
  );
}
