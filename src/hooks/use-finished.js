import { useCallback } from 'react';
import { clearFinishedStateReq, getFinishedReq } from 'src/redux/slices/finished';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useFinished() {
  const dispatch = useDispatch();
  const { finished } = useSelector((state) => state.finished);

  const onGetFinished = useCallback(
    async (id) => {
      await dispatch(getFinishedReq(id));
    },
    [dispatch],
  );

  const onClearFinishedState = useCallback(async () => {
    await dispatch(clearFinishedStateReq());
  }, [dispatch]);

  return {
    onGetFinished,
    onClearFinishedState,
    finished,
  };
}
