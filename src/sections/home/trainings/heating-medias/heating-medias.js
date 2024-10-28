import Stack from '@mui/material/Stack';

import HeatinItem from './heating-item';
export default function HeatingMedias({ medias, mediaOrder, exerciseInfo }) {
  return (
    <>
      <Stack>
        {[...medias]
          .sort((a, b) => [...mediaOrder].indexOf(a.id) - mediaOrder.indexOf(b.id))
          .map((media) => (
            <HeatinItem media={media} key={media.id} exerciseInfo={exerciseInfo} />
          ))}
      </Stack>
    </>
  );
}
