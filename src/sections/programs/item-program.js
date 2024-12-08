import PrintIcon from '@mui/icons-material/Print';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import PdfView from 'src/components/pdf-view/pdf-view';
import { useBoolean } from 'src/hooks/use-boolean';
import useHome from 'src/hooks/use-home';

export default function ItemProgram({ program, onView }) {
  const { onClearViewPdf } = useHome();
  const popover = usePopover();
  const viewPdf = useBoolean();
  const renderBanner = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Image
          alt={'banner'}
          src={
            program.type === 2 ? `/assets/banners/banner-gym.jpg` : `/assets/banners/banner-run.jpg`
          }
          sx={{ borderRadius: 1, height: 164, width: 1, opacity: !program.active && 0.3 }}
        />
      </Stack>
    </Stack>
  );

  const handleClosePdfView = () => {
    onClearViewPdf();
    viewPdf.onFalse();
  };

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      primary={format(new Date(program.referenceMonth), 'MMMM/yyyy', { locale: ptBR })}
      secondary={program.name}
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: !program.active ? 'text.disabled' : 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      {program.active && (
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      )}
      {(!program?.type || program?.type === 1) && (
        <>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: !program.active ? 'text.disabled' : 'text.primary' }}
          >
            {`PV: ${program.pv}`}
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: !program.active ? 'text.disabled' : 'text.primary' }}
          >
            {`Pace do PV: ${program.pace}`}
          </Stack>
        </>
      )}
      {false && (
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: !program.active ? 'text.disabled' : 'text.primary' }}
        >
          {`Total de treinos: ${program.trainings.length}`}
        </Stack>
      )}
    </Stack>
  );
  return (
    <>
      <Card>
        {renderBanner}
        {renderTexts}
        {renderInfo}
      </Card>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView(program.id, program.type);
          }}
        >
          <Iconify icon="solar:eye-bold" />
          Ver treino
        </MenuItem>
        <MenuItem
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onClick={(e) => {
            viewPdf.onTrue();
            popover.onClose();
          }}
        >
          <PrintIcon sx={{ fontSize: '22px', width: '22px', height: '30px' }} />
          Pdf
        </MenuItem>
      </CustomPopover>
      {viewPdf.value && (
        <PdfView open={viewPdf.value} onClose={handleClosePdfView} programId={program.id} />
      )}
    </>
  );
}
