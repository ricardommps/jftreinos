import { useCallback } from 'react';
import {
  clearStateWorkout,
  finishedWorkout,
  getWorkout,
  getWorkouts,
  getWorkoutsByProgramId,
} from 'src/redux/slices/workout';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useWorkout() {
  const dispatch = useDispatch();
  const {
    workouts,
    workoutsStatus,
    workoutAction,
    workoutActionStatus,
    workout,
    workousStatus,
    finished,
    finishedStatus,
  } = useSelector((state) => state.workout);

  // const onUpdateWorkout = useCallback(
  //   async (payload, id) => {
  //     await dispatch(upDateWorkout(payload, id));
  //   },
  //   [dispatch],
  // );

  const onClearStateWorkout = useCallback(async () => {
    await dispatch(clearStateWorkout());
  }, [dispatch]);

  const onListWorkouts = useCallback(
    async (programId, type) => {
      await dispatch(getWorkouts(programId, type));
    },
    [dispatch],
  );

  const onListWorkoutsByProgramId = useCallback(
    async (programId, type) => {
      await dispatch(getWorkoutsByProgramId(programId, type));
    },
    [dispatch],
  );

  const onGetWorkout = useCallback(
    async (id) => {
      await dispatch(getWorkout(id));
    },
    [dispatch],
  );

  const onFinishedWorkout = useCallback(
    async (payload, newVersion = false) => {
      await dispatch(finishedWorkout(payload, newVersion));
    },
    [dispatch],
  );

  return {
    onListWorkouts,
    onGetWorkout,
    onFinishedWorkout,
    onListWorkoutsByProgramId,
    workouts,
    workoutsStatus,
    workoutAction,
    workoutActionStatus,
    workout,
    workousStatus,
    finished,
    finishedStatus,
    onClearStateWorkout,
  };
}
