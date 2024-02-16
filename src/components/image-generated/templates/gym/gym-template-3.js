import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Iconify from 'src/components/iconify/iconify';
import Image from 'src/components/image/image';

import Logo from '../logo';
export default function GymTemplate3({
  isThumbnail,
  urlImage,
  colorText,
  bgColor,
  subtitle,
  datePublished,
}) {
  return (
    <>
      <Stack
        sx={{
          bottom: 3,
          left: 4,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
        }}
        spacing={1}
      >
        <Stack
          direction="column"
          sx={{
            backgroundColor: bgColor,
            borderRadius: isThumbnail ? '1px' : '8px',
            height: 'auto',
          }}
        >
          <Stack
            textAlign={'left'}
            direction="row"
            p={isThumbnail ? '1px 2px' : '2px 10px'}
            alignItems={'center'}
            spacing={isThumbnail ? 0.5 : 1}
          >
            <Iconify
              icon={'ic:baseline-fitness-center'}
              width={isThumbnail ? 10 : 20}
              color={colorText}
            />
            <Typography
              fontWeight={'bold'}
              color={colorText}
              sx={{ fontSize: isThumbnail ? '0.4rem !important' : '1.25rem !important' }}
            >
              {subtitle}
            </Typography>
          </Stack>
          <Typography
            fontWeight={'bold'}
            color={colorText}
            sx={{ fontSize: isThumbnail ? '0.4rem !important' : '1.25rem !important' }}
          >
            {format(new Date(datePublished), 'dd/MM/yyyy', { locale: ptBR })}
          </Typography>
        </Stack>
      </Stack>
      <Logo isThumbnail={isThumbnail} />
      <Image
        src={urlImage}
        alt="Preview"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      />
    </>
  );
}
