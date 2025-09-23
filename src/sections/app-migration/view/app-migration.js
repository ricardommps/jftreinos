import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';

export default function AppMigration() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          🚀 Temos novidades!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Agora nossos serviços estão disponíveis apenas pelo aplicativo oficial. Baixe
          gratuitamente e continue aproveitando todas as funcionalidades:
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AndroidIcon />}
            href="https://play.google.com/store/apps/details?id=seu.app"
            target="_blank"
            sx={{ borderRadius: 2 }}
          >
            Google Play
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<AppleIcon />}
            href="https://apps.apple.com/app/foltz/id6750486916"
            target="_blank"
            sx={{ borderRadius: 2 }}
          >
            App Store
          </Button>
        </Stack>
      </Paper>

      <Box mt={4} textAlign="center">
        <Typography variant="caption" color="text.secondary">
          Este site será descontinuado em breve. Instale o aplicativo para continuar acessando
          nossos serviços.
        </Typography>
      </Box>
    </Container>
  );
}
