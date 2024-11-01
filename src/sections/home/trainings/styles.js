import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Badge from '@mui/material/Badge';
import { alpha, styled } from '@mui/material/styles';

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -10,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const ListContent = styled('div')(() => ({
  backgroundColor: alpha('#333', 0.3),
  border: '1px solid #212121',
  borderRadius: '4px',
  boxShadow:
    '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)',
  paddingBottom: 8,
  marginBottom: 8,
}));
export const ListItem = styled('div')(() => ({
  padding: 0,
  position: 'relative',
  height: 'auto',

  overflow: 'hidden',

  textAlign: 'left',
  fontSize: '14px',
  display: 'flex',
  justifyContent: 'flex-start',
  '& img': {
    float: 'left',
    width: '80px',
    height: 'auto',
    borderRadius: '4px',
  },
}));

export const TextColum = styled('div')(() => ({
  float: 'left',
  width: '140px',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  flexGrow: 1,
}));

export const Title = styled('div')(() => ({
  height: 'auto',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical',
  fontSize: '16px',
  fontWeight: '600',
  color: '#ddd',
  padding: '2px 2px 0 8px',
}));
