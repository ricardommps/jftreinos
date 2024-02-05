import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function CommentItem({ me, message, sendDate }) {
  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      fontWeight={'bold'}
      sx={{
        mb: 1,
        color: 'text.primary',
        ...(!me && {
          mr: 'auto',
        }),
      }}
    >
      {!me && `${'Joana Foltz'},`} &nbsp;
      {sendDate &&
        formatDistanceToNowStrict(new Date(sendDate), {
          addSuffix: true,
          locale: ptBR,
        })}
    </Typography>
  );

  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        typography: 'body2',
        whiteSpace: 'pre-line',
        bgcolor: 'background.neutral',
        ...(!me && {
          color: 'grey.800',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {message}
    </Stack>
  );

  return (
    <Stack direction="row" justifyContent={me ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>
      <Stack alignItems="flex-end">
        {renderInfo}

        <Stack
          direction="row"
          alignItems="center"
          width="100%"
          sx={{
            position: 'relative',
            '&:hover': {
              '& .message-actions': {
                opacity: 1,
              },
            },
            ...(me && {
              justifyContent: 'flex-end',
            }),
          }}
        >
          {renderBody}
        </Stack>
      </Stack>
    </Stack>
  );
}
