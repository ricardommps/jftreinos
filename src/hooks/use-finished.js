import { useCallback } from 'react';
import {
  clearFinishedStateReq,
  clearVolume,
  getFinishedReq,
  getVolume,
} from 'src/redux/slices/finished';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useFinished() {
  const dispatch = useDispatch();
  const { finished, volume } = useSelector((state) => state.finished);

  const onGetFinished = useCallback(
    async (id) => {
      await dispatch(getFinishedReq(id));
    },
    [dispatch],
  );

  const onGetVolume = useCallback(
    async (programId, startDate, endDate) => {
      await dispatch(getVolume(programId, startDate, endDate));
    },
    [dispatch],
  );

  const onClearFinishedState = useCallback(async () => {
    await dispatch(clearFinishedStateReq());
  }, [dispatch]);

  const onClearVolumeState = useCallback(async () => {
    await dispatch(clearVolume());
  }, [dispatch]);

  return {
    onGetFinished,
    onClearFinishedState,
    finished,
    onGetVolume,
    onClearVolumeState,
    volume,
  };
}
