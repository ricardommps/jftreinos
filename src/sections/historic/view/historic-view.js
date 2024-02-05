'use client';
// eslint-disable-next-line simple-import-sort/imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import EmptyContent from 'src/components/empty-content/empty-content';
import Iconify from 'src/components/iconify/iconify';
import LoadingProgress from 'src/components/loading-progress';
import useHome from 'src/hooks/use-home';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { getModuleName } from 'src/utils/modules';

import HistoricFilter from '../historic-filter';
import HistoricList from '../historic.list';

const defaultFilters = {
  type: 'all',
  name: '',
};

const PER_PAGE = 5;

export default function HistoricView() {
  const { onFinishedList, finishedList, finishedListStatus } = useHome();
  const router = useRouter();

  const [period, setPeriod] = useState(30);
  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: finishedList,
    filters,
  });

  const [page, setPage] = useState(1);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleFilterName = useCallback(
    (event) => {
      handleFilters('name', event.target.value);
    },
    [handleFilters],
  );

  const handleResetFilterName = useCallback(() => {
    handleFilters('name', '');
  }, [handleFilters]);

  const getFinishedList = useCallback(() => {
    const timestampFrom = new Date();
    const timestampTo = new Date(new Date().setDate(timestampFrom.getDate() - period));
    timestampFrom.setDate(timestampFrom.getDate() + 1);
    const timestampFromFormated = format(new Date(timestampFrom), 'yyyy-MM-dd');
    const timestampToFormated = format(new Date(timestampTo), 'yyyy-MM-dd');
    onFinishedList(timestampFromFormated, timestampToFormated);
  }, [period]);

  useEffect(() => {
    getFinishedList();
  }, [period]);

  useEffect(() => {
    if (finishedListStatus.error) {
      enqueueSnackbar(`Não foi possível executar esta operação. Tente novamente mais tarde`, {
        autoHideDuration: 8000,
        variant: 'error',
      });
      router.push(paths.dashboard.home.root);
    }
  }, [finishedListStatus.error]);

  useEffect(() => {
    setPage(1);
    setFilters(defaultFilters);
  }, [period]);

  return (
    <>
      <Stack spacing={1} direction="row">
        <Button
          component={RouterLink}
          href={paths.dashboard.home.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Voltar
        </Button>
      </Stack>
      <Box
        sx={{
          mt: 1,
          width: 1,
          height: 'auto',
          padding: '10px 0',
        }}
      >
        <Typography variant="h3" textAlign={'center'}>
          Histórico
        </Typography>
        <HistoricFilter period={period} setPeriod={setPeriod} />
        <Box p={2}>
          {finishedListStatus.loading ? (
            <LoadingProgress />
          ) : (
            <>
              {finishedListStatus.empty && (
                <EmptyContent
                  imgUrl="/assets/icons/empty/ic_content.svg"
                  sx={{
                    borderRadius: 1.5,
                    bgcolor: 'background.default',
                    height: '50vh',
                  }}
                  title="Nenhum histórico encontrado"
                />
              )}
              {finishedList && !finishedListStatus.empty && dataFiltered && (
                <HistoricList
                  historics={dataFiltered}
                  page={page}
                  setPage={setPage}
                  perPage={PER_PAGE}
                  filters={filters}
                  handleFilters={handleFilters}
                  finishedList={finishedList}
                  getFinishedList={getFinishedList}
                  handleFilterName={handleFilterName}
                  handleResetFilterName={handleResetFilterName}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

const applyFilter = ({ inputData, filters }) => {
  const { type, name } = filters;
  if (name) {
    console.log('--inputData--', inputData);
    inputData = inputData.filter(
      (item) =>
        getModuleName(item?.trainingname)?.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        item?.trainingsubtitle?.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
  }
  if (inputData) {
    if (type === 'corrida') {
      inputData = inputData.filter((item) => item.type === 1);
    }
    if (type === 'forca') {
      inputData = inputData.filter((item) => item.type === 2);
    }
  }

  return inputData;
};
