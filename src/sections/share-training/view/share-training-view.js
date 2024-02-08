'use client';

import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import exportAsImage from 'src/utils/export-as-image';

import ImageCropper from '../image-crop';
import Template1 from '../templates/template-1';

export default function ShareTrainingView() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const avatarUrl = useRef(null);
  const fileRef = useRef(null);
  const exportRef = useRef();

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const handleCloseModal = () => {
    setLoading(false);
    setModalOpen(false);
  };

  const onSuccess = () => {
    enqueueSnackbar('Imagem salva com sucesso! Agora é so compartilhar nas suas redes sociais.', {
      autoHideDuration: 8000,
      variant: 'success',
    });
    router.replace(paths.dashboard.root);
  };

  const handleSubmit = () => {
    setLoading(true);
    exportAsImage(exportRef.current, 'screenshot', setLoading, onSuccess);
  };

  useEffect(() => {
    if (fileRef.current && modalOpen) {
      fileRef.current.click();
    }
  }, [modalOpen]);

  return (
    <Box p={2}>
      {loading && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      {!modalOpen && (
        <>
          {!avatarUrl.current && (
            <>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="success">
                  <Typography>Treino concluido com sucesso!</Typography>
                </Alert>
                <Typography variant="h6" textAlign={'center'}>
                  Bora compartilhar esse treinão e mostrar para todos como você esta vooando:
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} justifyContent={'end'} pt={8} pr={2}>
                <Button variant="outlined">Não</Button>
                <Button variant="contained" onClick={() => setModalOpen(true)}>
                  Sim
                </Button>
              </Stack>
            </>
          )}

          {avatarUrl.current && (
            <Stack spacing={2} pb={0}>
              <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ ml: 2, mr: 2 }}>
                Trocar imagem
              </Button>

              <div ref={exportRef}>
                <Stack spacing={0.5} direction="row">
                  <Stack flexGrow={1} sx={{ position: 'relative' }}>
                    <Stack
                      direction="row"
                      sx={{
                        top: 3,
                        left: 0,
                        zIndex: 9,
                        position: 'absolute',
                        p: '2px 6px 2px 4px',
                        color: 'common.white',
                        typography: 'h6',
                        justifyContent: 'left',
                        textAlign: 'left',
                      }}
                      spacing={1}
                    >
                      <Iconify icon={'carbon:running'} width={20} />
                      <Typography width={300} fontWeight={'bold'}>
                        Florianópolis Corrida
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        transform: 'rotate(90deg)',
                        top: 14,
                        right: -19,
                        zIndex: 9,
                        bgcolor: 'grey.800',
                        position: 'absolute',
                        p: '2px 6px 2px 4px',
                        color: 'common.white',
                        typography: 'subtitle2',
                      }}
                    >
                      <Image
                        disabledEffect
                        alt={'home'}
                        src={`/assets/logo/logo-crop.png`}
                        style={{ width: 'auto', height: 60 }}
                        width={'auto'}
                      />
                    </Stack>
                    <Stack
                      direction="column"
                      alignItems="center"
                      sx={{
                        bottom: 30,
                        right: 4,
                        zIndex: 9,
                        borderRight: '2px dotted',
                        position: 'absolute',
                        p: '2px 6px 2px 4px',
                        color: 'common.white',
                        typography: 'h6',
                        justifyContent: 'end',
                        textAlign: 'end',
                        width: 130,
                      }}
                      spacing={0.5}
                    >
                      <Stack>
                        <Typography width={100} fontWeight={'bold'}>
                          5,02Km
                        </Typography>
                        <Typography width={100} fontWeight={'bold'}>
                          DISTÂNCIA
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography width={100} fontWeight={'bold'}>
                          30:50
                        </Typography>
                        <Typography width={100} fontWeight={'bold'}>
                          TEMPO
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography width={100} fontWeight={'bold'}>
                          6:08/KM
                        </Typography>
                        <Typography width={100} fontWeight={'bold'}>
                          RITMO
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      sx={{
                        bottom: 2,
                        left: 0,
                        zIndex: 9,
                        position: 'absolute',
                        p: '2px 6px 2px 4px',
                        color: 'common.white',
                        typography: 'h6',
                        justifyContent: 'left',
                        textAlign: 'left',
                        width: 130,
                      }}
                    >
                      <Typography width={300} fontWeight={'bold'}>
                        6 de fev de 2024 19:37 Florianópolis
                      </Typography>
                    </Stack>
                    <Image
                      src={avatarUrl.current}
                      alt="Preview"
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                    />
                  </Stack>
                </Stack>
              </div>
              <Box>
                <Stack>
                  <Typography>Selecione um modelo</Typography>
                </Stack>
                <Stack p={2}>
                  <Box display="grid" gap={2} gridTemplateColumns="repeat(3, 1fr)">
                    <Template1 imgSrc={avatarUrl.current} />
                  </Box>
                </Stack>
                <Stack>
                  <Typography>Selecione a cor para os textos</Typography>
                </Stack>

                <Stack direction={'row'} spacing={2} pt={5} justifyContent={'end'}>
                  <Button variant="outlined">Fechar</Button>
                  <Button variant="contained" onClick={handleSubmit}>
                    Gerar imagem
                  </Button>
                </Stack>
              </Box>
            </Stack>
          )}
        </>
      )}

      {modalOpen && (
        <ImageCropper
          updateAvatar={updateAvatar}
          closeModal={handleCloseModal}
          fileRef={fileRef}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </Box>
  );
}
