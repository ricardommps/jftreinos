import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ThumbnailSelectGym from '../thumbnail-select-gym';
import ThumbnailSelectRunner from '../thumbnail-select-runner';

export default function SelectTemplate({
  templatePopover,
  urlImage,
  configTemplate,
  templateType,
  setConfigTemplate,
  colorText,
  bgColor,
  finishedtraining,
}) {
  return (
    <Popover
      open={Boolean(templatePopover.open)}
      anchorEl={templatePopover.open}
      onClose={templatePopover.onClose}
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
            onClick={templatePopover.onClose}
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
            Selecione um template
          </Typography>
          <Stack spacing={3}>
            {templateType === 'gym' && (
              <ThumbnailSelectGym
                urlImage={urlImage}
                configTemplate={configTemplate}
                setConfigTemplate={setConfigTemplate}
                colorText={colorText}
                bgColor={bgColor}
                onClose={templatePopover.onClose}
                finishedtraining={finishedtraining}
              />
            )}
            {templateType === 'runner' && (
              <ThumbnailSelectRunner
                urlImage={urlImage}
                configTemplate={configTemplate}
                setConfigTemplate={setConfigTemplate}
                colorText={colorText}
                bgColor={bgColor}
                onClose={templatePopover.onClose}
                finishedtraining={finishedtraining}
              />
            )}
          </Stack>
        </Stack>
      </Box>
    </Popover>
  );
}
