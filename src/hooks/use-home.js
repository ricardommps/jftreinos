import { useCallback } from 'react';
import {
  clearViewPdf,
  finishedtrainingReq,
  getAllPrograms,
  getFinishedListReq,
  getProgramDetail,
  getViewPdf,
  viewedFeedBack,
} from 'src/redux/slices/home';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useHome() {
  const dispatch = useDispatch();
  const {
    programs,
    programsStatus,
    programDetail,
    programDetailStatus,
    finishedtraining,
    finishedtrainingDetailStatus,
    trainings,
    trainingsStatus,
    finishedList,
    finishedListStatus,
    viewedSuccess,
    viewedError,
    viewPdf,
    viewPdfStatus,
  } = useSelector((state) => state.home);

  const onListPrograms = useCallback(() => {
    dispatch(getAllPrograms());
  }, [dispatch]);

  const onProgramDetail = useCallback(
    (programId) => {
      dispatch(getProgramDetail(programId));
    },
    [dispatch],
  );

  const onFinishedTraining = useCallback(
    (finishedData) => {
      dispatch(finishedtrainingReq(finishedData));
    },
    [dispatch],
  );

  const onFinishedList = useCallback(
    (id) => {
      dispatch(getFinishedListReq(id));
    },
    [dispatch],
  );

  const onViewedFeedBack = useCallback(
    (id) => {
      dispatch(viewedFeedBack(id));
    },
    [dispatch],
  );

  const onViewPdf = useCallback(
    (programId) => {
      dispatch(getViewPdf(programId));
    },
    [dispatch],
  );

  const onClearViewPdf = useCallback(() => {
    dispatch(clearViewPdf());
  }, [dispatch]);

  return {
    onListPrograms,
    programs,
    programsStatus,
    onProgramDetail,
    programDetail,
    programDetailStatus,
    onFinishedTraining,
    finishedtraining,
    finishedtrainingDetailStatus,
    trainings,
    trainingsStatus,
    finishedList,
    finishedListStatus,
    onFinishedList,
    onViewedFeedBack,
    viewedSuccess,
    viewedError,
    onViewPdf,
    viewPdf,
    viewPdfStatus,
    onClearViewPdf,
  };
}
