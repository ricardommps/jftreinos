'use client';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import Label from 'src/components/label';
import { useBoolean } from 'src/hooks/use-boolean';
import useMetrics from 'src/hooks/use-metrics';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import ChartView from '../chart-view';
import MetricsItem from '../metric-item';
const defaultFilters = {
  type: 'all',
};
const TYPE_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 1, label: 'Desempenho' },
  { value: 2, label: 'Competição' },
  { value: 3, label: 'Parametros fisiológicos' },
];
export default function MetricsView() {
  const { onListMetrics, metrics, metricsStatus } = useMetrics();
  const [filters, setFilters] = useState(defaultFilters);
  const [tableData, setTableData] = useState([]);
  const [metricSelected, setMetricSelected] = useState(null);
  const chartView = useBoolean();

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  const initialize = useCallback(async () => {
    try {
      onListMetrics();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleOpenChart = (row) => {
    setMetricSelected(row);
  };

  const handleFilterType = useCallback(
    (event, newValue) => {
      handleFilters('type', newValue);
    },
    [handleFilters],
  );

  const handleCloseChart = () => {
    chartView.onFalse();
    setMetricSelected(null);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (metricSelected) {
      chartView.onTrue();
    }
  }, [metricSelected]);

  useEffect(() => {
    if (metrics) {
      setTableData([...metrics]);
    }
  }, [metrics]);
  return (
    <>
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
          <Box>
            <Typography variant="h6" align="center">
              Métricas
            </Typography>
          </Box>
        </Stack>
        <Box>
          {metricsStatus.loading && (
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
          {!metricsStatus.loading && metrics && filters && (
            <>
              <Box pb={2}>
                <Tabs
                  value={filters.type}
                  onChange={handleFilterType}
                  sx={{
                    px: 2.5,
                    boxShadow: (theme) =>
                      `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                  }}
                >
                  {TYPE_OPTIONS.map((tab) => (
                    <Tab
                      key={tab.value}
                      iconPosition="end"
                      value={tab.value}
                      label={tab.label}
                      icon={
                        <Label
                          variant={
                            ((tab.value === 'all' || tab.value === filters.type) && 'filled') ||
                            'soft'
                          }
                          color={
                            (tab.value === 1 && 'success') ||
                            (tab.value === 2 && 'warning') ||
                            (tab.value === 3 && 'error') ||
                            'default'
                          }
                        >
                          {tab.value === 'all' && metrics.length}
                          {tab.value === 1 && metrics.filter((item) => item.type === '1').length}

                          {tab.value === 2 && metrics.filter((item) => item.type === '2').length}
                          {tab.value === 3 && metrics.filter((item) => item.type === '3').length}
                        </Label>
                      }
                    />
                  ))}
                </Tabs>
              </Box>
              {metricsStatus.empty || !metrics ? (
                <Stack></Stack>
              ) : (
                <>
                  <Box
                    gap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      md: 'repeat(2, 1fr)',
                    }}
                  >
                    {dataFiltered.map((row) => (
                      <MetricsItem key={row.id} row={row} handleOpenChart={handleOpenChart} />
                    ))}
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Container>
      {chartView.value && (
        <ChartView
          open={chartView.value}
          onClose={handleCloseChart}
          chartData={metricSelected.chartData}
          type={Number(metricSelected.type)}
        />
      )}
    </>
  );
}

function applyFilter({ inputData, filters }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);
  inputData = stabilizedThis.map((el) => el[0]);
  if (filters.type !== 'all') {
    inputData = inputData.filter((item) => Number(item.type) === filters.type);
  }

  return inputData;
}
