import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import useHome from 'src/hooks/use-home';

import FinishedItem from './finished-item';

export default function FinishedList({ id, type }) {
  const { finishedList, finishedListStatus, onFinishedList } = useHome();

  useEffect(() => {
    onFinishedList(id);
  }, []);

  const refreshList = () => {
    onFinishedList(id);
  };

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
      }}
    >
      {finishedListStatus.loading && (
        <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
          <Box
            sx={{
              mt: 1,
              width: 1,
              height: 320,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress color="error" />
          </Box>
        </Stack>
      )}
      {!finishedListStatus.loading && finishedList && (
        <>
          {finishedList.map((item) => (
            <FinishedItem key={item.id} finishedItem={item} refreshList={refreshList} type={type} />
          ))}
        </>
      )}
    </Box>
  );
}
