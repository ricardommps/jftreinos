import { Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Iconify from 'src/components/iconify/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import useHome from 'src/hooks/use-home';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import FinishedList from '../finished-training/finished-list';
import Calendar from '../trainings/calendar/calendar';
import ProgramInfo from './program-info';

export default function ProgramDetails() {
  const {
    onProgramDetail,
    programDetailStatus,
    programDetail,
    finishedtraining,
    trainingsStatus,
    onFinishedList,
    finishedList,
    finishedListStatus,
  } = useHome();
  const params = useParams();
  const finishedListOpen = useBoolean();
  const { id } = params;

  useEffect(() => {
    if (id) {
      onProgramDetail(id);
      onFinishedList(id);
    }
  }, []);

  const refreshList = () => {
    onFinishedList(id);
  };

  useEffect(() => {
    if (finishedtraining) {
      onProgramDetail(id);
    }
  }, [finishedtraining]);

  const loading = programDetailStatus.loading || trainingsStatus.loading;

  const itensReview = () => {
    const review = finishedList?.filter((item) => item?.review === true && !item?.fed_viewed);
    return review?.length || null;
  };
  return (
    <Container maxWidth={'lg'}>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Button
          component={RouterLink}
          href={paths.dashboard.home.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Voltar
        </Button>
      </Stack>
      <Stack
        spacing={3}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {loading && (
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
        {!loading && programDetail && (
          <>
            <Box>
              {!finishedListOpen.value && (
                <Badge badgeContent={itensReview()} color="warning">
                  <Button variant="outlined" onClick={finishedListOpen.onToggle}>
                    Meus treinos finalizados
                  </Button>
                </Badge>
              )}
              {finishedListOpen.value && (
                <Button variant="outlined" onClick={finishedListOpen.onFalse}>
                  Meus treinos pendentes
                </Button>
              )}
            </Box>
            <ProgramInfo programDetail={programDetail} />
            <Typography variant="h6" align="center">
              {!finishedListOpen.value ? ' Treinos pendentes' : ' Treinos finalizados'}
            </Typography>
            {!finishedListOpen.value && <Calendar id={id} type={programDetail.type} />}
            {finishedListOpen.value && (
              <FinishedList
                type={programDetail.type}
                refreshList={refreshList}
                finishedList={finishedList}
                finishedListStatus={finishedListStatus}
              />
            )}
          </>
        )}
      </Stack>
    </Container>
  );
}
