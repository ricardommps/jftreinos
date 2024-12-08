import InputAdornment from '@mui/material/InputAdornment';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useCallback } from 'react';
import Iconify from 'src/components/iconify';
import usePagination from 'src/hooks/use-pagination';

import HistoryItem from '../workout/history/history-item';

export default function HistoricList({
  historics,
  page,
  setPage,
  perPage,
  filters,
  handleFilters,
  finishedList,
  getFinishedList,
  handleResetFilterName,
}) {
  const STATUS_OPTIONS = [{ value: 'all', label: 'Todos' }];

  const data = usePagination(historics, perPage);
  const count = Math.ceil(historics?.length / perPage);
  const handleChange = (e, p) => {
    setPage(p);
    data.jump(p);
  };

  const handleFilterType = useCallback(
    (event, newValue) => {
      setPage(1);
      handleResetFilterName();
      data.resetPage();
      handleFilters('type', newValue);
    },
    [handleFilters],
  );

  const handleFilterName = useCallback(
    (event) => {
      setPage(1);
      data.resetPage();
      handleFilters('name', event.target.value);
    },
    [handleFilters],
  );
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        flexGrow={1}
        sx={{ width: 1 }}
        pt={3}
        pb={3}
      >
        <TextField
          fullWidth
          type="search"
          value={filters.name}
          onChange={handleFilterName}
          placeholder="Buscar nome do treino ou subtítulo"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <>
        {data.currentData().map((item) => (
          <HistoryItem historyItem={item} key={item.id} workoutInfo={true} />
        ))}
        {historics.length > perPage && (
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            sx={{
              mt: 8,
              [`& .${paginationClasses.ul}`]: {
                justifyContent: 'center',
              },
            }}
          />
        )}
      </>
    </>
  );
}
