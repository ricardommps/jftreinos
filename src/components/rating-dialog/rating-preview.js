import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAuthContext } from 'src/auth/hooks';
import styled from 'styled-components';

const StyledSpeechBubble = styled.p`
  // layout
  position: relative;
  max-width: 30em;

  // looks
  background-color: #fff;
  padding: 1.125em 1.5em;
  font-size: 1.25em;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    bottom: 100%;
    left: 1.5em; // offset should move with padding of parent
    border: 0.75rem solid transparent;
    border-top: none;

    // looks
    border-bottom-color: #fff;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }
`;

export default function RatingPreview({ goBack, values, loading }) {
  const { user } = useAuthContext();
  return (
    <Box>
      <Box>
        <Box pl={1}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
            src={user?.avatar ? user?.avatar : user?.name}
          />
        </Box>
        {values.testimony && values.testimony.length > 0 && (
          <>
            <StyledSpeechBubble>
              <Typography sx={{ color: 'black', fontSize: '0.75rem' }}>
                {values.testimony}
              </Typography>
            </StyledSpeechBubble>
            <Divider sx={{ py: 1 }} />
          </>
        )}
      </Box>
      <Stack direction={'column'} spacing={3}>
        {values.ratingTrainings && (
          <>
            <Stack
              spacing={2}
              sx={{
                p: 1,
                position: 'relative',
                pt: 3,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <ListItemText
                  primary={'Satisfação com os treinos'}
                  secondaryTypographyProps={{
                    component: 'span',
                    typography: 'caption',
                    mt: 0.5,
                    color: 'text.disabled',
                  }}
                />
              </Stack>
              <Rating value={values.ratingTrainings} size="small" readOnly />
              {values.commentsRatingTrainings && (
                <Typography variant="body2">{values.commentsRatingTrainings}</Typography>
              )}
            </Stack>
            <Divider />
          </>
        )}

        {values.ratingApp && (
          <Stack
            spacing={2}
            sx={{
              p: 1,
              position: 'relative',
              pt: 3,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <ListItemText
                primary={'Satisfação com o App'}
                secondaryTypographyProps={{
                  component: 'span',
                  typography: 'caption',
                  mt: 0.5,
                  color: 'text.disabled',
                }}
              />
            </Stack>
            <Rating value={values.ratingApp} size="small" readOnly />
            {values.commentsRatingApp && (
              <Typography variant="body2">{values.commentsRatingApp}</Typography>
            )}
          </Stack>
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent={'flex-end'}
        sx={{ mt: 3, mb: 3 }}
        spacing={2}
      >
        <Button variant="outlined" onClick={goBack}>
          Voltar
        </Button>
        <LoadingButton variant="contained" type="submit" loading={loading}>
          Salvar
        </LoadingButton>
      </Stack>
    </Box>
  );
}
