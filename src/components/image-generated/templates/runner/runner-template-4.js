import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify/iconify';
import Image from 'src/components/image/image';
import { formatedPace, fShortenNumber } from 'src/utils/format-number';
import { getModuleName } from 'src/utils/modules';

import Logo from '../logo';
export default function RunnerTemplate4({
  isThumbnail,
  urlImage,
  colorText,
  bgColor,
  module,
  typetraining,
  distance,
  duration,
  pace,
  intensities,
}) {
  const isNumber = (val) => typeof val === 'number' && val === val;
  const calculateAverage = () => {
    if (intensities?.length > 0) {
      const intensitiesParse = intensities.map((item) => JSON.parse(item));
      const intensitiesValues = intensitiesParse.map((item) => {
        if (item.value) {
          return item.value;
        }
        return item.intensitie;
      });
      const noEmptyValues = intensitiesValues.filter((str) => str !== '' && str > 0);
      const average = noEmptyValues.reduce((p, c) => p + c, 0) / noEmptyValues.length;
      if (isNaN(average)) {
        return 0;
      }
      return Math.floor(average * 100) / 100;
    }
    return 0;
  };
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
            alignItems: 'center',
            p: isThumbnail ? '0px 4px' : '0px 15px',
          }}
        >
          <Stack
            textAlign={'left'}
            direction="row"
            p={isThumbnail ? '1px 2px' : '2px 10px'}
            alignItems={'center'}
            spacing={isThumbnail ? 0.5 : 1}
          >
            {typetraining === 'indoor' ? (
              <Iconify icon={'tabler:treadmill'} width={isThumbnail ? 12 : 25} color={colorText} />
            ) : (
              <Iconify icon={'carbon:running'} width={isThumbnail ? 12 : 25} color={colorText} />
            )}
            <Typography
              fontWeight={'bold'}
              color={colorText}
              sx={{ fontSize: isThumbnail ? '0.4rem !important' : '1rem !important' }}
            >
              {getModuleName(module)}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={isThumbnail ? 0.5 : 2} pt={1}>
            <Stack>
              <Typography
                fontWeight={'bold'}
                color={colorText}
                sx={{ fontSize: isThumbnail ? '0.4rem !important' : '1rem !important' }}
              >
                DISTÂNCIA
              </Typography>
              <Typography
                fontWeight={'bold'}
                color={colorText}
                sx={{ fontSize: isThumbnail ? '0.4rem !important' : '1rem !important' }}
              >
                {`${fShortenNumber(distance)}m`}
              </Typography>
            </Stack>
            <Divider
              orientation="vertical"
              flexItem
              color={colorText}
              sx={{ borderRightWidth: 2 }}
            />
            <Stack>
              <Typography
                fontWeight={'bold'}
                color={colorText}
                sx={{ fontSize: isThumbnail ? '0.4rem !important' : '1rem !important' }}
              >
                TEMPO
              </Typography>
              <Typography
                fontWeight={'bold'}
                color={colorText}
                sx={{ fontSize: isThumbnail ? '0.4rem !important' : '1rem !important' }}
              >
                {fShortenNumber(duration)}
              </Typography>
            </Stack>
            {(pace.length > 0 || isNumber(pace) || intensities.length > 0) && (
              <>
                <Divider
                  orientation="vertical"
                  flexItem
                  color={colorText}
                  sx={{ borderRightWidth: 2 }}
                />
                <Stack>
                  <Typography
                    fontWeight={'bold'}
                    color={colorText}
                    sx={{ fontSize: isThumbnail ? '0.4rem !important' : '1rem !important' }}
                  >
                    RITMO
                  </Typography>
                  <Typography
                    fontWeight={'bold'}
                    color={colorText}
                    sx={{ fontSize: isThumbnail ? '0.4rem !important' : '1rem !important' }}
                  >
                    {intensities.length > 0 ? (
                      <>{calculateAverage()}</>
                    ) : (
                      <> {fShortenNumber(formatedPace(pace))}</>
                    )}
                  </Typography>
                </Stack>
              </>
            )}
          </Stack>
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
