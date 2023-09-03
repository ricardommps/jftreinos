import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Scrollbar from 'src/components/scrollbar/scrollbar';

import TrainingItem from './training-item';
export default function TrainingsList() {
  const renderTitle = <Typography variant="h4">Meus treinos</Typography>;
  const renderContent = (
    <>
      <Stack direction="row" spacing={1}>
        <Chip label="Finalizado" color="primary" />
        <Chip label="Vencido" color="error" />
        <Chip label="Proximo/Atual" color="warning" />
      </Stack>
      <Stack sx={{ height: '50vh', overflow: 'hidden' }}>
        <Scrollbar>
          <Stack spacing={2}>
            <TrainingItem finished={true} title={'Rodagem'} date={'31/08/2023'} />
            <TrainingItem finished={true} title={'HIIT 1:1'} date={'01/09/2023'} />
            <TrainingItem expired={true} title={'Rodagem'} date={'02/09/2023'} />
            <TrainingItem expired={false} current={true} title={'HIIT 1:1'} date={'03/09/2023'} />
            <TrainingItem expired={false} current={false} title={'HIIT 2:1'} date={'04/09/2023'} />
            <TrainingItem expired={false} current={false} title={'Rodagem'} date={'05/09/2023'} />
            <TrainingItem expired={false} current={false} title={'HIIT 1:1'} date={'06/09/2023'} />
            <TrainingItem expired={false} current={false} title={'HIIT 2:1'} date={'07/09/2023'} />
          </Stack>
        </Scrollbar>
      </Stack>
    </>
  );
  return (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      {renderTitle}
      {renderContent}
    </Stack>
  );
}
