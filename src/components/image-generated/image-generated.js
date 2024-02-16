import PaletteIcon from '@mui/icons-material/Palette';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePopover } from 'src/components/custom-popover';
import { useShareTemplate } from 'src/hooks/use-share-template';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import exportAsImage from 'src/utils/export-as-image';

import ImageCropper from '../image-crop/image-crop';
import ContainerTemplate from './container-template';
import SelectBgColor from './popovers/select-bgColor';
import SelectColor from './popovers/select-color';
import SelectTemplate from './popovers/select-template';
import RenderGymTemplates from './render-gym-templates';
import RenderRunnerTemplates from './render-runner-template';

export default function ImageGenerated({ finishedtraining, handleGoBack, onClearShare }) {
  const router = useRouter();

  const exportRef = useRef();
  const imageUrl = useRef(null);
  const fileRef = useRef(null);

  const { colorText, setColorText, bgColor, setBgColor } = useShareTemplate();

  const templatePopover = usePopover();
  const colorPopover = usePopover();
  const bgClorPopover = usePopover();

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [configTemplate, setConfigTemplate] = useState(1);
  const [templateType, setTemplateType] = useState(null);
  const [ativeBgColor, setAtiveBgColor] = useState(false);

  const updateAvatar = (imgSrc) => {
    imageUrl.current = imgSrc;
  };

  const handleCloseModal = () => {
    setLoading(false);
    setModalOpen(false);
  };

  const handleChangeSwitch = useCallback(
    (event) => {
      setAtiveBgColor(event.target.checked);
      if (!event.target.checked) {
        setBgColor('transparent');
      }
    },
    [setAtiveBgColor],
  );

  const onSuccess = () => {
    enqueueSnackbar('Imagem salva com sucesso! Agora é so compartilhar nas suas redes sociais.', {
      autoHideDuration: 8000,
      variant: 'success',
    });
    onClearShare();
    router.replace(paths.dashboard.root);
  };

  const handleSubmit = () => {
    setLoading(true);
    exportAsImage(exportRef.current, 'screenshot', setLoading, onSuccess);
  };

  const handleClose = () => {
    onClearShare();
    router.replace(paths.dashboard.root);
  };

  useEffect(() => {
    if (fileRef.current && modalOpen) {
      fileRef.current.click();
    }
  }, [modalOpen]);

  useEffect(() => {
    if (finishedtraining) {
      if (finishedtraining?.distance) {
        setTemplateType('runner');
      } else {
        setTemplateType('gym');
      }
    }
  }, []);

  return (
    <Box>
      <Typography variant="h4" textAlign={'center'}>
        Compartilhar treino
      </Typography>
      {loading && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      {!modalOpen && !imageUrl.current && (
        <>
          <Button variant="contained" onClick={() => setModalOpen(true)} fullWidth>
            Selecione uma imagem
          </Button>
          <Stack direction={'row'} spacing={2} pt={5} justifyContent={'end'}>
            <Button variant="outlined" onClick={handleClose}>
              Fechar
            </Button>
          </Stack>
        </>
      )}
      {!modalOpen && imageUrl.current && (
        <Stack>
          <Button
            variant="contained"
            onClick={() => setModalOpen(true)}
            sx={{ ml: 2, mr: 2, mb: 2 }}
          >
            Trocar imagem
          </Button>
          <div ref={exportRef}>
            <ContainerTemplate>
              {templateType && (
                <>
                  {templateType === 'gym' ? (
                    <RenderGymTemplates
                      finishedtraining={finishedtraining}
                      configTemplate={configTemplate}
                      urlImage={imageUrl.current}
                      colorText={colorText}
                      bgColor={bgColor}
                    />
                  ) : (
                    <RenderRunnerTemplates
                      finishedtraining={finishedtraining}
                      configTemplate={configTemplate}
                      urlImage={imageUrl.current}
                      colorText={colorText}
                      bgColor={bgColor}
                    />
                  )}
                </>
              )}
            </ContainerTemplate>
          </div>
          <Box pt={2}>
            <Stack>
              <Button
                variant="outlined"
                sx={{ width: 'fit-content' }}
                onClick={templatePopover.onOpen}
              >
                Selecione um modelo
              </Button>
              <SelectTemplate
                templatePopover={templatePopover}
                urlImage={imageUrl.current}
                configTemplate={configTemplate}
                templateType={templateType}
                setConfigTemplate={setConfigTemplate}
                colorText={colorText}
                bgColor={bgColor}
                finishedtraining={finishedtraining}
              />
            </Stack>
            <Stack pt={3}>
              <Button
                variant="outlined"
                endIcon={<PaletteIcon sx={{ color: colorText }} />}
                sx={{ width: 'fit-content' }}
                onClick={colorPopover.onOpen}
              >
                Selecione a cor para os textos
              </Button>
              <SelectColor
                colorPopover={colorPopover}
                colorText={colorText}
                setColorText={setColorText}
              />
            </Stack>
            <Stack pt={3}>
              <Stack>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={Boolean(ativeBgColor)}
                      onChange={handleChangeSwitch}
                    />
                  }
                  label="Background para os textos"
                  labelPlacement="end"
                />
              </Stack>
            </Stack>
            {ativeBgColor && (
              <Stack pt={3}>
                <Button
                  variant="outlined"
                  endIcon={<PaletteIcon sx={{ color: bgColor }} />}
                  sx={{ width: 'fit-content' }}
                  onClick={bgClorPopover.onOpen}
                >
                  Selecione a cor para Background
                </Button>
                <SelectBgColor
                  bgClorPopover={bgClorPopover}
                  bgColor={bgColor}
                  setBgColor={setBgColor}
                />
              </Stack>
            )}
            <Stack direction={'row'} spacing={2} pt={5} justifyContent={'end'}>
              <Button variant="outlined" onClick={handleClose}>
                Fechar
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Gerar imagem
              </Button>
            </Stack>
          </Box>
        </Stack>
      )}

      {modalOpen && (
        <ImageCropper
          updateAvatar={updateAvatar}
          closeModal={handleCloseModal}
          fileRef={fileRef}
          loading={loading}
          setLoading={setLoading}
          handleGoBack={handleGoBack}
        />
      )}
    </Box>
  );
}
