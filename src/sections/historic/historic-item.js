import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import Comments from 'src/components/comments';
import Iconify from 'src/components/iconify';
import Intensities from 'src/components/intensities';
import ProgramInfo from 'src/components/program-info';
import SwipeableEdgeDrawer from 'src/components/swipeable-edge-drawer';
import TrainingInfo from 'src/components/training-info';
import { useBoolean } from 'src/hooks/use-boolean';
import { formatedPace, fShortenNumber } from 'src/utils/format-number';
import { getModuleName } from 'src/utils/modules';

export default function HistoricItem({ historic, refreshList }) {
  const theme = useTheme();
  const openDrawer = useBoolean();

  const [openType, setOpenType] = useState(null);

  const handleOpenInfoProgram = () => {
    setOpenType('infoProgram');
  };

  const handleOpenInfoTraining = () => {
    setOpenType('infoTraining');
  };

  const handleOpenComments = () => {
    setOpenType('comments');
  };

  const handleOpenIntensities = () => {
    setOpenType('intensities');
  };

  const handleOpenDrawer = (type) => {
    setOpenType(type);
  };

  const handleCloseDrawer = () => {
    openDrawer.onFalse();
    if (openType === 'comments' && historic?.description_feedback && !historic?.fed_viewed) {
      refreshList();
    }
    setOpenType(null);
  };

  const renderTitleDrawer = () => {
    if (openType === 'infoProgram') return 'Informações do programa';
    if (openType === 'infoTraining') return 'Informações do treino';
    if (openType === 'comments') return 'Comentarios e feedbacks';
    if (openType === 'intensities') return 'Intensidade dos esforços';
  };

  useEffect(() => {
    if (openType) {
      openDrawer.onTrue();
    }
  }, [openType]);

  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1} pt={3}>
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'h6',
            color: historic?.type === 2 ? theme.palette.info.main : theme.palette.success.main,
          }}
          pl={1}
        >
          {historic.programname}
          <Iconify
            icon="material-symbols:info"
            sx={{ color: historic?.type === 2 ? 'info.main' : 'success.main' }}
            onClick={handleOpenInfoProgram}
          />
        </Stack>
        <Stack
          alignItems={'flex-end'}
          pr={2}
          sx={{
            color: historic?.type === 2 ? theme.palette.info.main : theme.palette.success.main,
          }}
        >
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {format(new Date(historic.month), 'MMM/yyyy', { locale: ptBR })}
          </Typography>
        </Stack>
      </Box>
      <Card sx={{ p: 1 }}>
        {historic.unrealized && (
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ typography: 'h6', bgcolor: theme.palette.error.main, padding: 1 }}
          >
            Treino não realizado
          </Stack>
        )}

        <Box sx={{ p: 2 }} display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
          <Stack>
            <Stack spacing={1} direction="row" alignItems="center" sx={{ typography: 'h6' }}>
              {getModuleName(historic.trainingname)}
              <Iconify icon="material-symbols:info" onClick={handleOpenInfoTraining} />
            </Stack>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {format(new Date(historic.trainingdatepublished), 'dd/MM/yyyy', { locale: ptBR })}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{ textTransform: 'capitalize' }}
            >
              {historic.typetraining && `${historic.typetraining} - `}{' '}
              {historic.unitmeasurement && historic.unitmeasurement === 'pace' ? 'min' : 'km/h'}
            </Typography>
          </Stack>
          <Stack spacing={2} alignItems={'flex-end'} paddingRight={2}>
            <Box
              sx={{ paddingLeft: 2 }}
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={3}
            >
              {historic.distance && (
                <Stack direction="row" alignItems="center">
                  <Iconify icon="game-icons:path-distance" width={20} sx={{ mr: 0.5 }} />
                  {fShortenNumber(historic.distance)}
                </Stack>
              )}
              {historic.duration && (
                <Stack direction="row" alignItems="center">
                  <Iconify icon="material-symbols:timer-outline" width={20} sx={{ mr: 0.5 }} />
                  {fShortenNumber(historic.duration)}
                </Stack>
              )}

              {historic.pace && (
                <Stack direction="row" alignItems="center">
                  <Iconify icon="material-symbols:speed-outline" width={20} sx={{ mr: 0.5 }} />
                  {fShortenNumber(formatedPace(historic.pace))}
                </Stack>
              )}
              {historic.rpe > 0 && (
                <Stack direction="row" alignItems="center">
                  <Iconify icon="fluent:emoji-16-regular" width={20} sx={{ mr: 0.5 }} />
                  {historic.rpe}
                </Stack>
              )}
            </Box>
          </Stack>
        </Box>
        <Box pl={2} pb={2}>
          <Typography
            variant="subtitle1"
            color={historic?.type === 2 ? theme.palette.info.main : theme.palette.success.main}
          >
            Finalizado em: {format(new Date(historic.created_at), 'dd/MM/yyyy', { locale: ptBR })}
          </Typography>
        </Box>
        <CardActions
          sx={{
            width: '100%',
            justifyContent: 'flex-end',
            borderTop: `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {(historic?.comments?.length > 0 || historic?.description_feedback) && (
            <Stack direction="row" alignItems="center">
              <IconButton onClick={handleOpenComments}>
                <Iconify
                  icon="bi:chat"
                  width={25}
                  color={
                    historic?.description_feedback && !historic?.fed_viewed
                      ? theme.palette.warning.main
                      : theme.palette.success.main
                  }
                />
              </IconButton>
            </Stack>
          )}
          {historic?.intensities?.length > 0 && (
            <Stack direction="row" alignItems="center">
              <IconButton onClick={handleOpenIntensities}>
                <Iconify
                  icon="ic:outline-run-circle"
                  width={25}
                  color={theme.palette.success.main}
                />
              </IconButton>
            </Stack>
          )}
        </CardActions>
      </Card>
      {historic && (
        <SwipeableEdgeDrawer
          open={openDrawer.value}
          onOpen={handleOpenDrawer}
          onClose={handleCloseDrawer}
          title={renderTitleDrawer()}
        >
          <Stack>
            <>
              {openType === 'infoProgram' && <ProgramInfo historic={historic} />}
              {openType === 'infoTraining' && <TrainingInfo historic={historic} />}
              {openType === 'comments' && (
                <Comments
                  comments={historic?.comments}
                  feedback={historic?.description_feedback}
                  commentsDate={historic?.created_at}
                  feedbackcreated={historic?.feedbackcreated}
                  feedbackid={historic?.feedbackid}
                  viewed={historic?.fed_viewed}
                />
              )}
              {openType === 'intensities' && (
                <Intensities
                  intensitiesData={historic?.intensities}
                  unitmeasurement={historic?.unitmeasurement}
                />
              )}
            </>
          </Stack>
        </SwipeableEdgeDrawer>
      )}
    </>
  );
}
