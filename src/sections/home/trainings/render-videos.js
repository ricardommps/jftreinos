import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player/youtube';
export default function RenderVideos({ videos }) {
  return (
    <Stack spacing={1} pt={3}>
      {videos.map((video, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{video.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ReactPlayer className="react-player" url={video.url} width="100%" />
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
