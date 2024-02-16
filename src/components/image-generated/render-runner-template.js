import RunnerTemplate1 from './templates/runner/runner-template-1';
import RunnerTemplate2 from './templates/runner/runner-template-2';
import RunnerTemplate3 from './templates/runner/runner-template-3';
import RunnerTemplate4 from './templates/runner/runner-template-4';

export default function RenderRunnerTemplates({
  finishedtraining,
  configTemplate,
  urlImage,
  colorText,
  bgColor,
}) {
  if (configTemplate === 1) return <RunnerTemplate1 urlImage={urlImage} />;
  if (configTemplate === 2)
    return (
      <RunnerTemplate2
        urlImage={urlImage}
        colorText={colorText}
        bgColor={bgColor}
        module={finishedtraining.training.name}
        typetraining={finishedtraining.typetraining}
      />
    );
  if (configTemplate === 3)
    return (
      <RunnerTemplate3
        urlImage={urlImage}
        colorText={colorText}
        bgColor={bgColor}
        module={finishedtraining.training.name}
        typetraining={finishedtraining.typetraining}
        datePublished={finishedtraining.training.datePublished}
      />
    );
  if (configTemplate === 4)
    return (
      <RunnerTemplate4
        urlImage={urlImage}
        colorText={colorText}
        bgColor={bgColor}
        module={finishedtraining.training.name}
        typetraining={finishedtraining.typetraining}
        distance={finishedtraining.distance}
        duration={finishedtraining.duration}
        pace={finishedtraining.pace}
        intensities={finishedtraining.intensities}
      />
    );
}
