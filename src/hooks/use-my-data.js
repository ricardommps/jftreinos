import { useCallback } from 'react';
import { getMyData, uploadFile } from 'src/redux/slices/home';
import { useDispatch, useSelector } from 'src/redux/store';

export default function useMyData() {
  const dispatch = useDispatch();
  const { myData, myDataStatus, upload, uploadStatus } = useSelector((state) => state.home);

  const onGetMyData = useCallback(() => {
    dispatch(getMyData());
  }, [dispatch]);

  const onUpload = useCallback(
    (file) => {
      dispatch(uploadFile(file));
    },
    [dispatch],
  );

  return {
    myData,
    myDataStatus,
    onGetMyData,
    onUpload,
    upload,
    uploadStatus,
  };
}
