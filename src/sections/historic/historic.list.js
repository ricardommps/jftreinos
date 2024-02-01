import Pagination, { paginationClasses } from '@mui/material/Pagination';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useCallback } from 'react';
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
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
      data.resetPage();
      handleFilters('type', newValue);
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
      <Scrollbar sx={{ maxHeight: 500 }}>
        {data.currentData().map((historic) => (
          <HistoricItem historic={historic} key={historic.id} refreshList={refreshList} />
        ))}
      </Scrollbar>
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
  );
}
