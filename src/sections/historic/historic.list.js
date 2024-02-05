import InputAdornment from '@mui/material/InputAdornment';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { useCallback } from 'react';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import usePagination from 'src/hooks/use-pagination';

import HistoricItem from './historic-item';

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
  const STATUS_OPTIONS = [
    { value: 'all', label: 'Todos' },
    { value: 'corrida', label: 'Corrida' },
    { value: 'forca', label: 'Força' },
  ];

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

  const refreshList = () => {
    setPage(1);
    data.resetPage();
    getFinishedList();
  };

  return (
    <>
      <Tabs
        value={filters.type}
        onChange={handleFilterType}
        indicatorColor="secondary"
        sx={{
          boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
        }}
      >
        {STATUS_OPTIONS.map((tab) => (
          <Tab
            key={tab.value}
            iconPosition="end"
            value={tab.value}
            label={tab.label}
            icon={
              <Label
                variant={
                  ((tab.value === 'all' || tab.value === filters.item) && 'filled') || 'soft'
                }
                color={
                  (tab.value === 'all' && 'default') ||
                  (tab.value === 'corrida' && 'success') ||
                  (tab.value === 'forca' && 'info') ||
                  'default'
                }
              >
                {tab.value === 'all' && finishedList.length}

                {tab.value === 'corrida' &&
                  finishedList.filter((item) => item.type === 1 || !item?.type).length}

                {tab.value === 'forca' && finishedList.filter((item) => item.type === 2).length}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>
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
        {data.currentData().map((historic) => (
          <HistoricItem historic={historic} key={historic.id} refreshList={refreshList} />
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
