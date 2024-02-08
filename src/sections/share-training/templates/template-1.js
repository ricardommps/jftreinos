import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
export default function Template1({ imgSrc }) {
  return (
    <Paper
      sx={{
        textAlign: 'center',
        height: 'fit-content',
      }}
    >
      <Stack direction="row">
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
              justifyContent: 'left',
              textAlign: 'left',
            }}
            spacing={0.5}
          >
            <Iconify icon={'carbon:running'} width={6} />
            <Typography fontWeight={'bold'} sx={{ fontSize: '0.3em', width: '10em' }}>
              Florianópolis Corrida
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              bottom: 1,
              left: 0,
              zIndex: 9,
              position: 'absolute',
              p: '2px 6px 2px 4px',
              color: 'common.white',
              justifyContent: 'left',
              textAlign: 'left',
            }}
            spacing={0.5}
          >
            <Typography fontWeight={'bold'} sx={{ fontSize: '0.2em', width: '18em' }}>
              6 de fev de 2024 19:37 Florianópolis
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              transform: 'rotate(90deg)',
              top: 6,
              right: -8,
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
              style={{ width: 'auto', height: 20 }}
              width={'auto'}
            />
          </Stack>
          <Image disabledEffect alt={'home'} src={imgSrc} />
        </Stack>
      </Stack>
    </Paper>
  );
}
