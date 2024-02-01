import Box from '@mui/material/Box';
import { useEffect } from 'react';
import Scrollbar from 'src/components/scrollbar';
import useHome from 'src/hooks/use-home';

import CommentItem from './comment-item';
export default function Comments({
  comments,
  feedback,
  commentsDate,
  feedbackcreated,
  feedbackid,
  viewed,
}) {
  const { onViewedFeedBack } = useHome();
  useEffect(() => {
    if (feedback && !viewed) {
      onViewedFeedBack(feedbackid);
    }
  }, []);
  return (
    <>
      <Scrollbar sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {feedback && <CommentItem message={feedback} sendDate={feedbackcreated} />}
          {comments?.length > 0 && (
            <CommentItem me={true} message={comments} sendDate={commentsDate} />
          )}
        </Box>
      </Scrollbar>
    </>
  );
}
