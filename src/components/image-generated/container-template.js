import Stack from '@mui/material/Stack';
export default function ContainerTemplate({ children }) {
  return (
    <Stack spacing={0.5} direction="row">
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        {children}
      </Stack>
    </Stack>
  );
}
