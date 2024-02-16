import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import ContainerTemplate from './container-template';
import RunnerTemplate1 from './templates/runner/runner-template-1';
import RunnerTemplate2 from './templates/runner/runner-template-2';
import RunnerTemplate3 from './templates/runner/runner-template-3';
import RunnerTemplate4 from './templates/runner/runner-template-4';

export default function ThumbnailSelectRunner({
  urlImage,
  setConfigTemplate,
  colorText,
  bgColor,
  onClose,
  finishedtraining,
}) {
  const handleSelectTemplate = (type) => {
    setConfigTemplate(type);
    onClose();
  };
  return (
    <>
      <Stack direction={'row'} spacing={2}>
        <Box onClick={() => handleSelectTemplate(1)}>
          <Paper
            square
            sx={{
              height: 150,
              width: 150,
              maxHeight: 150,
              maxWidth: 150,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <RunnerTemplate1 isThumbnail urlImage={urlImage} />
            </ContainerTemplate>
          </Paper>
        </Box>
        <Box onClick={() => handleSelectTemplate(2)}>
          <Paper
            square
            sx={{
              height: 150,
              width: 150,
              maxHeight: 150,
              maxWidth: 150,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <RunnerTemplate2
                isThumbnail
                urlImage={urlImage}
                colorText={colorText}
                bgColor={bgColor}
                module={finishedtraining?.training?.name}
                typetraining={finishedtraining?.typetraining}
              />
            </ContainerTemplate>
          </Paper>
        </Box>
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <Box onClick={() => handleSelectTemplate(3)}>
          <Paper
            square
            sx={{
              height: 150,
              width: 150,
              maxHeight: 150,
              maxWidth: 150,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <RunnerTemplate3
                isThumbnail
                urlImage={urlImage}
                colorText={colorText}
                bgColor={bgColor}
                module={finishedtraining?.training?.name}
                typetraining={finishedtraining?.typetraining}
                datePublished={finishedtraining.training.datePublished}
              />
            </ContainerTemplate>
          </Paper>
        </Box>
        <Box onClick={() => handleSelectTemplate(4)}>
          <Paper
            square
            sx={{
              height: 150,
              width: 150,
              maxHeight: 150,
              maxWidth: 150,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <RunnerTemplate4
                isThumbnail
                urlImage={urlImage}
                colorText={colorText}
                bgColor={bgColor}
                module={finishedtraining?.training?.name}
                typetraining={finishedtraining?.typetraining}
                distance={finishedtraining.distance}
                duration={finishedtraining.duration}
                pace={finishedtraining.pace}
                intensities={finishedtraining.intensities}
              />
            </ContainerTemplate>
          </Paper>
        </Box>
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <Box onClick={() => handleSelectTemplate(5)}>
          <Paper
            square
            sx={{
              height: 150,
              width: 150,
              maxHeight: 150,
              maxWidth: 150,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <RunnerTemplate1 isThumbnail urlImage={urlImage} />
            </ContainerTemplate>
          </Paper>
        </Box>
        <Box onClick={() => handleSelectTemplate(6)}>
          <Paper
            square
            sx={{
              height: 150,
              width: 150,
              maxHeight: 150,
              maxWidth: 150,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <RunnerTemplate1 isThumbnail urlImage={urlImage} />
            </ContainerTemplate>
          </Paper>
        </Box>
      </Stack>
    </>
  );
}
