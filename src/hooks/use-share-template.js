import { useCallback, useState } from 'react';
import { clearShare, getShare, getShareAndFormated, setShareOpen } from 'src/redux/slices/share';
import { useDispatch, useSelector } from 'src/redux/store';

export function useShareTemplate() {
  const dispatch = useDispatch();
  const { share, shareOpen } = useSelector((state) => state.share);

  const [colorText, setColorText] = useState('white');
  const [bgColor, setBgColor] = useState('transparent');

  const onGetShare = useCallback(
    (data) => {
      dispatch(getShare(data));
    },
    [dispatch],
  );

  const onGetShareAndFormated = useCallback(
    (data) => {
      dispatch(getShareAndFormated(data));
    },
    [dispatch],
  );

  const onClearShare = useCallback(() => {
    dispatch(clearShare());
  }, [dispatch]);

  const onSetShareOpen = useCallback(
    (value) => {
      dispatch(setShareOpen(value));
    },
    [dispatch],
  );

  return {
    colorText,
    bgColor,
    setColorText,
    setBgColor,
    share,
    onGetShare,
    onGetShareAndFormated,
    shareOpen,
    setShareOpen,
    onClearShare,
    onSetShareOpen,
  };
}
