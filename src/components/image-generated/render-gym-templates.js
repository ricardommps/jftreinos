import GymTemplate1 from './templates/gym/gym-template-1';
import GymTemplate2 from './templates/gym/gym-template-2';
import GymTemplate3 from './templates/gym/gym-template-3';
import GymTemplate4 from './templates/gym/gym-template-4';
import GymTemplate5 from './templates/gym/gym-template-5';
import GymTemplate6 from './templates/gym/gym-template-6';

export default function RenderGymTemplates({
  finishedtraining,
  configTemplate,
  urlImage,
  colorText,
  bgColor,
}) {
  if (configTemplate === 1) return <GymTemplate1 urlImage={urlImage} />;
  if (configTemplate === 2)
    return (
      <GymTemplate2
        urlImage={urlImage}
        colorText={colorText}
        bgColor={bgColor}
        subtitle={finishedtraining.training.subtitle}
      />
    );
  if (configTemplate === 3)
    return (
      <GymTemplate3
        urlImage={urlImage}
        colorText={colorText}
        bgColor={bgColor}
        subtitle={finishedtraining.training.subtitle}
        datePublished={finishedtraining.training.datePublished}
      />
    );
  if (configTemplate === 4)
    return (
      <GymTemplate4
        urlImage={urlImage}
        colorText={colorText}
        bgColor={bgColor}
        subtitle={finishedtraining.training.subtitle}
      />
    );
  if (configTemplate === 5)
    return (
      <GymTemplate5
        urlImage={urlImage}
        colorText={colorText}
        bgColor={bgColor}
        subtitle={finishedtraining.training.subtitle}
      />
    );
  if (configTemplate === 6)
    return (
      <GymTemplate6
        urlImage={urlImage}
        colorText={colorText}
        bgColor={bgColor}
        subtitle={finishedtraining.training.subtitle}
        datePublished={finishedtraining.training.datePublished}
      />
    );
}
