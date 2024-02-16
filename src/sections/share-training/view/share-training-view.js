'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ImageGenerated from 'src/components/image-generated';
import { useShareTemplate } from 'src/hooks/use-share-template';
import { useRouter } from 'src/routes/hook';

export default function ShareTrainingView() {
  const router = useRouter();
  const { share, shareOpen, onClearShare, onSetShareOpen } = useShareTemplate();

  const handleGoBack = () => {
    onClearShare();
    router.back();
  };

  return (
    <>
      {share && (
        <Box p={2}>
          {!shareOpen && (
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
                <Button variant="outlined" onClick={handleGoBack}>
                  Não
                </Button>
                <Button variant="contained" onClick={() => onSetShareOpen(true)}>
                  Sim
                </Button>
              </Stack>
            </>
          )}
          {shareOpen && (
            <ImageGenerated
              finishedtraining={share}
              handleGoBack={handleGoBack}
              onClearShare={onClearShare}
            />
          )}
        </Box>
      )}
    </>
  );
}
