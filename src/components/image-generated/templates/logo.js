import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Image from 'src/components/image/image';
export default function Logo({ isThumbnail }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        transform: 'rotate(90deg)',
        top: isThumbnail ? 10 : 19,
        right: isThumbnail ? -5 : -13,
        zIndex: 9,
        bgcolor: 'grey.800',
        position: 'absolute',
        p: '2px 6px 2px 4px',
        color: 'common.white',
        typography: 'subtitle2',
      }}
    >
      {isThumbnail ? (
        <Paper
          sx={{
            height: '3vw',
            width: '4vw',
            backgroundColor: 'rgba(33, 43, 54, 0.9)',
          }}
        />
      ) : (
        <Image
          disabledEffect
          alt={'home'}
          src={`/assets/logo/logo-crop.png`}
          style={{ width: 'auto', height: isThumbnail ? '12px' : '9vw' }}
          width={'auto'}
        />
      )}
    </Stack>
  );
}
