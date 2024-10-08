import { useCallback } from 'react';
import {
  clearAnamneseState,
  clearCheckEmail,
  createAnamneseReq,
  getCheckEmailReq,
} from 'src/redux/slices/anamnese';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useAnamnese() {
  const dispatch = useDispatch();
  const { checkEmail, checkEmailStatus, anamneseCreate, anamneseCreateStatus } = useSelector(
    (state) => state.anamnese,
  );

  const onCheckEmail = useCallback(
    (customerEmail) => {
      dispatch(getCheckEmailReq(customerEmail));
    },
    [dispatch],
  );

  const onCreateAnamnese = useCallback(
    (anamnese) => {
      dispatch(createAnamneseReq(anamnese));
    },
    [dispatch],
  );

  const onClearCheckEmail = useCallback(() => {
    dispatch(clearCheckEmail());
  }, [dispatch]);

  const onClearAnamneseState = useCallback(() => {
    dispatch(clearAnamneseState());
  }, [dispatch]);

  return {
    onCheckEmail,
    onClearCheckEmail,
    onCreateAnamnese,
    onClearAnamneseState,
    checkEmail,
    checkEmailStatus,
    anamneseCreate,
    anamneseCreateStatus,
  };
}
