import { useCallback } from 'react';
import { getTraining } from 'src/redux/slices/training';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useTraining() {
  const dispatch = useDispatch();
  const { training, trainingStatus } = useSelector((state) => state.training);

  const onGetTraining = useCallback(
    (id) => {
      dispatch(getTraining(id));
    },
    [dispatch],
  );

  return {
    onGetTraining,
    training,
    trainingStatus,
  };
}
