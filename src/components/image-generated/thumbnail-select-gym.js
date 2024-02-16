import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import ContainerTemplate from './container-template';
import GymTemplate1 from './templates/gym/gym-template-1';
import GymTemplate2 from './templates/gym/gym-template-2';
import GymTemplate3 from './templates/gym/gym-template-3';
import GymTemplate4 from './templates/gym/gym-template-4';
import GymTemplate5 from './templates/gym/gym-template-5';
import GymTemplate6 from './templates/gym/gym-template-6';

export default function ThumbnailSelectGym({
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
              height: 140,
              width: 140,
              maxHeight: 140,
              maxWidth: 140,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <GymTemplate1 isThumbnail urlImage={urlImage} />
            </ContainerTemplate>
          </Paper>
        </Box>
        <Box onClick={() => handleSelectTemplate(2)}>
          <Paper
            square
            sx={{
              height: 140,
              width: 140,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <GymTemplate2
                isThumbnail
                urlImage={urlImage}
                colorText={colorText}
                bgColor={bgColor}
                subtitle={finishedtraining.training.subtitle}
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
              height: 140,
              width: 140,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <GymTemplate3
                isThumbnail
                urlImage={urlImage}
                colorText={colorText}
                bgColor={bgColor}
                subtitle={finishedtraining.training.subtitle}
                datePublished={finishedtraining.training.datePublished}
              />
            </ContainerTemplate>
          </Paper>
        </Box>
        <Box onClick={() => handleSelectTemplate(4)}>
          <Paper
            square
            sx={{
              height: 140,
              width: 140,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <GymTemplate4
                isThumbnail
                urlImage={urlImage}
                colorText={colorText}
                bgColor={bgColor}
                subtitle={finishedtraining.training.subtitle}
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
              height: 140,
              width: 140,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <GymTemplate5
                isThumbnail
                urlImage={urlImage}
                colorText={colorText}
                bgColor={bgColor}
                subtitle={finishedtraining.training.subtitle}
              />
            </ContainerTemplate>
          </Paper>
        </Box>
        <Box onClick={() => handleSelectTemplate(6)}>
          <Paper
            square
            sx={{
              height: 140,
              width: 140,
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
          >
            <ContainerTemplate>
              <GymTemplate6
                isThumbnail
                urlImage={urlImage}
                colorText={colorText}
                bgColor={bgColor}
                subtitle={finishedtraining.training.subtitle}
                datePublished={finishedtraining.training.datePublished}
              />
            </ContainerTemplate>
          </Paper>
        </Box>
      </Stack>
    </>
  );
}
