import { useCallback } from 'react';
import {
  finishedRequest,
  getWorkoutItem,
  getWorkouts as getWorkoutsAction,
} from 'src/redux/slices/workouts';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useWorkouts() {
  const dispatch = useDispatch();
  const { workoutsNew, workoutsNewStatus, workoutItem, workoutItemStatus, finishedStatus } =
    useSelector((state) => state.workouts);

  const onGetWorkouts = useCallback(
    async (programId, type) => {
      await dispatch(getWorkoutsAction(programId, type));
    },
    [dispatch],
  );

  const onGetWorkoutItem = useCallback(
    async (id) => {
      await dispatch(getWorkoutItem(id));
    },
    [dispatch],
  );

  const onFinished = useCallback(
    async (payload) => {
      await dispatch(finishedRequest(payload));
    },
    [dispatch],
  );

  return {
    onGetWorkouts,
    workoutsNew,
    workoutsNewStatus,
    onGetWorkoutItem,
    workoutItem,
    workoutItemStatus,
    onFinished,
    finishedStatus,
  };
}
