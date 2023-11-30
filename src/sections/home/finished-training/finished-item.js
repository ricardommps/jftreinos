import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import { useBoolean } from 'src/hooks/use-boolean';
import { fShortenNumber } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

import FeedbackTraining from '../feedback-training/feedback-training';
export default function FinishedItem({ finishedItem, refreshList }) {
  const openFeedback = useBoolean();
  const formatedPace = (pace) => {
    const paceStr = pace.replace(',', '.').replace(' ', '');
    return Number(paceStr);
  };
  const handleCloseFeedbackTraining = () => {
    openFeedback.onFalse();
    refreshList();
  };
  return (
    <>
      <Card>
        <Stack sx={{ p: 3, pb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            {finishedItem.review && (
              <Button
                variant="outlined"
                color={finishedItem.fed_viewed ? 'success' : 'warning'}
                onClick={openFeedback.onTrue}
              >
                Feedback
              </Button>
            )}
            {!finishedItem.review && <Stack></Stack>}
            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {fDate(new Date(finishedItem.date_published))}
            </Box>
          </Stack>
          <Stack spacing={2} flexGrow={1}>
            <TextMaxLine variant="subtitle2" line={1}>
              {finishedItem.trainingname}
            </TextMaxLine>
            <TextField
              id="outlined-multiline-static"
              label="Descrição"
              multiline
              rows={4}
              value={finishedItem.trainingdesc}
              disabled
            />
          </Stack>
          <Stack direction="row" alignItems="center" pt={2}>
            <Stack
              spacing={1.5}
              flexGrow={1}
              direction="row"
              justifyContent="flex-end"
              sx={{
                typography: 'caption',
              }}
            >
              <Stack direction="row" alignItems="center">
                <Iconify icon="game-icons:path-distance" width={20} sx={{ mr: 0.5 }} />
                {fShortenNumber(finishedItem.distance)}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify icon="material-symbols:timer-outline" width={20} sx={{ mr: 0.5 }} />
                {fShortenNumber(finishedItem.duration)}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify icon="material-symbols:speed-outline" width={20} sx={{ mr: 0.5 }} />
                {fShortenNumber(formatedPace(finishedItem.pace))}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify icon="fluent:emoji-16-regular" width={20} sx={{ mr: 0.5 }} />
                {fShortenNumber(finishedItem.rpe)}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      {openFeedback.value && (
        <FeedbackTraining
          open={openFeedback.value}
          onClose={handleCloseFeedbackTraining}
          finishedItem={finishedItem}
        />
      )}
    </>
  );
}
