import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';

import WorkoutItem from '../../components/workoutView/workout-item';

export default function WorkoutNewViewGroup({
  media,
  mediaInfo,
  isWorkoutLoad,
  checkList = [],
  handleCheckList,
}) {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(1);
  const handleType = () => {
    let title = '';
    if (media.length === 2) {
      title = 'BISET';
    }

    if (media.length === 3) {
      title = 'TRISET';
    }

    if (media.length > 3) {
      title = 'CIRCUITO';
    }
    //
    return (
      <Alert
        variant="outlined"
        severity="info"
        icon={false}
        sx={{
          marginBottom: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center', // Centraliza o conteúdo dentro do Alert
          alignItems: 'center', // Alinha os itens verticalmente
          textAlign: 'center', // Centraliza o texto dentro do Box
        }}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <CarouselArrows
              filled
              onNext={carousel.onNext}
              onPrev={carousel.onPrev}
              currentSlide={currentSlide}
              size={media.length}
            />
          </Box>
        </Box>
      </Alert>
    );
  };

  const carousel = useCarousel({
    slidesToShow: 4,
    infinite: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex + 1),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
  return (
    <Box
      sx={{
        p: 2,
        overflow: 'hidden',
        borderRadius: 2,
        backgroundColor: 'rgba(0, 184, 217, 0.08)',
      }}
      component={Paper}
    >
      {handleType()}
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {media.map((subMedia) => (
          <WorkoutItem
            key={subMedia.id}
            media={subMedia}
            mediaInfo={mediaInfo}
            isWorkoutLoad={isWorkoutLoad}
            checkList={checkList}
            handleCheckList={handleCheckList}
          />
        ))}
      </Carousel>
    </Box>
  );
}
