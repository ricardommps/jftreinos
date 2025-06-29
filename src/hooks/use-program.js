import { useCallback } from 'react';
import { getProgram } from 'src/redux/slices/program';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useProgram() {
  const dispatch = useDispatch();
  const { program } = useSelector((state) => state.program);

  const onGetProgram = useCallback(
    async (programId) => {
      await dispatch(getProgram(programId));
    },
    [dispatch],
  );

  return {
    onGetProgram,
    program,
  };
}
