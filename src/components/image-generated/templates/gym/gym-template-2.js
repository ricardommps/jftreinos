import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify/iconify';
import Image from 'src/components/image/image';

import Logo from '../logo';
export default function GymTemplate2({ isThumbnail, urlImage, colorText, bgColor, subtitle }) {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          bottom: 3,
          left: 4,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
          justifyContent: 'left',
          textAlign: 'left',
        }}
        spacing={1}
      >
        <Stack
          sx={{
            backgroundColor: bgColor,
            borderRadius: isThumbnail ? '1px' : '8px',
            height: 'auto',
          }}
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
