import { useCallback } from 'react';
import { clearRating, getRating, saveRating } from 'src/redux/slices/rating';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useRating() {
  const dispatch = useDispatch();
  const { rating, ratingStatus } = useSelector((state) => state.rating);

  const onSaveRating = useCallback(
    (rating) => {
      dispatch(saveRating(rating));
    },
    [dispatch],
  );

  const onGetRating = useCallback(() => {
    dispatch(getRating());
  }, [dispatch]);

  const onClearRating = useCallback(() => {
    dispatch(clearRating());
  }, [dispatch]);

  return {
    onSaveRating,
    onGetRating,
    onClearRating,
    rating,
    ratingStatus,
  };
}
