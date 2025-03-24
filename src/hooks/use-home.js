import { useCallback } from 'react';
import {
  clearFinishedtraining,
  clearViewPdf,
  finishedtrainingReq,
  getAllPrograms,
  getFinishedListReq,
  getProgramDetail,
  getViewPdf,
  hideAlertOverdueAction,
  showAlertOverdueAction,
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
    alertOverdue,
    alertOverdueHide,
  } = useSelector((state) => state.home);

  const onListPrograms = useCallback(async () => {
    await dispatch(getAllPrograms());
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
    (timestampFrom, timestampTo) => {
      dispatch(getFinishedListReq(timestampFrom, timestampTo));
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
    async (programId) => {
      await dispatch(getViewPdf(programId));
    },
    [dispatch],
  );

  const onClearViewPdf = useCallback(() => {
    dispatch(clearViewPdf());
  }, [dispatch]);

  const onClearFinishedtraining = useCallback(() => {
    dispatch(clearFinishedtraining());
  }, [dispatch]);

  const onShowAlertOverdue = useCallback(() => {
    dispatch(showAlertOverdueAction());
  }, [dispatch]);

  const onHideAlertOverdue = useCallback(() => {
    dispatch(hideAlertOverdueAction());
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
    onClearFinishedtraining,
    onShowAlertOverdue,
    onHideAlertOverdue,
    alertOverdue,
    alertOverdueHide,
  };
}
