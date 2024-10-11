import { useCallback } from 'react';
import { getNotificationsReq, readAtReq } from 'src/redux/slices/notification';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useANotifications() {
  const dispatch = useDispatch();
  const { notifications, notificationsStatus, readAtStatus, readAt } = useSelector(
    (state) => state.notifications,
  );

  const onGetNotifications = useCallback(
    async (notificationId) => {
      return dispatch(getNotificationsReq(notificationId)); // Retorna a Promise
    },
    [dispatch],
  );

  const onReadAt = useCallback(
    async (anamnese) => {
      dispatch(readAtReq(anamnese));
    },
    [dispatch],
  );

  return {
    onGetNotifications,
    onReadAt,
    notifications,
    notificationsStatus,
    readAt,
    readAtStatus,
  };
}
