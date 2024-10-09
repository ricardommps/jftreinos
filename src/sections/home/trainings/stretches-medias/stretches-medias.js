import Stack from '@mui/material/Stack';

import StretcheItem from './stretches-item';
export default function StretchesMedias({ medias, mediaOrder, exerciseInfo }) {
  return (
    <>
      <Stack>
        {[...medias]
          .sort((a, b) => [...mediaOrder].indexOf(a.id) - mediaOrder.indexOf(b.id))
          .map((media) => (
            <StretcheItem media={media} key={media.id} exerciseInfo={exerciseInfo} />
          ))}
      </Stack>
    </>
  );
}
