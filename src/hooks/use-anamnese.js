import { useCallback } from 'react';
import {
  anamneseLoginReq,
  clearAnamneseState,
  clearCheckEmail,
  createAnamneseReq,
  getCheckEmailReq,
} from 'src/redux/slices/anamnese';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useAnamnese() {
  const dispatch = useDispatch();
  const {
    checkEmail,
    checkEmailStatus,
    anamneseCreate,
    anamneseCreateStatus,
    anamneseLogin,
    anamneseLoginStatus,
  } = useSelector((state) => state.anamnese);

  const onCheckEmail = useCallback(
    async (customerEmail) => {
      return dispatch(getCheckEmailReq(customerEmail)); // Retorna a Promise
    },
    [dispatch],
  );

  const onCreateAnamnese = useCallback(
    async (anamnese, token, id) => {
      dispatch(createAnamneseReq(anamnese, token, id));
    },
    [dispatch],
  );

  const onLoginAnamnese = useCallback(
    async (payload) => {
      dispatch(anamneseLoginReq(payload));
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
    onLoginAnamnese,
    anamneseLogin,
    anamneseLoginStatus,
  };
}
