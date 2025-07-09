import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function AdditionalInfo({ additionalInformation }) {
  return (
    <>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3, m: 3 }}>
        <Stack direction="column" alignItems="center" width={'100%'}>
          <Typography variant="subtitle1" textAlign={'center'}>
            Informações adicionais
          </Typography>
          <Stack direction="column" alignItems="left" sx={{ mt: 2, mb: 1 }} width={'100%'}>
            <Typography variant="subtitle" textAlign={'left'} mt={3}>
              {additionalInformation}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
