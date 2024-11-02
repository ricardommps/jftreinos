import { useCallback } from 'react';
import { getTraining, getWorkoutLoad, saveWorkoutLoadReq } from 'src/redux/slices/training';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useTraining() {
  const dispatch = useDispatch();
  const {
    training,
    trainingStatus,
    workoutLoad,
    workoutLoadStatus,
    saveWorkoutLoad,
    saveWorkoutLoadStatus,
  } = useSelector((state) => state.training);

  const onGetTraining = useCallback(
    (id) => {
      dispatch(getTraining(id));
    },
    [dispatch],
  );

  const onGetWorkoutLoad = useCallback(
    (id) => {
      dispatch(getWorkoutLoad(id));
    },
    [dispatch],
  );

  const onSaveWorkoutLoad = useCallback(
    (id, load) => {
      dispatch(saveWorkoutLoadReq(id, load));
    },
    [dispatch],
  );

  return {
    onGetTraining,
    training,
    trainingStatus,
    onGetWorkoutLoad,
    workoutLoad,
    workoutLoadStatus,
    onSaveWorkoutLoad,
    saveWorkoutLoad,
    saveWorkoutLoadStatus,
  };
}
