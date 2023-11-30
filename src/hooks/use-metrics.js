import { useCallback } from 'react';
import { getAllMetrics } from 'src/redux/slices/metrics';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useMetrics() {
  const dispatch = useDispatch();
  const { metrics, metricsStatus } = useSelector((state) => state.metrics);

  const onListMetrics = useCallback(() => {
    dispatch(getAllMetrics());
  }, [dispatch]);

  return {
    onListMetrics,
    metrics,
    metricsStatus,
  };
}
