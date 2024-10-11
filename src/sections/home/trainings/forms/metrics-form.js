import { Controller, useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import {
  convertMetersToKilometersFormat,
  convertSecondsToHourMinuteFormat,
} from 'src/utils/convertValues';
export default function MetricsForm({ setOpenDistanceSelect, setOpenTimeSelect }) {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name="distanceInMeters"
        control={control}
        render={({ field }) => (
          <RHFTextField
            InputProps={{
              readOnly: true, // Faz com que o campo seja apenas leitura
            }}
            name="distanceInMeters"
            label="Selecione a distância percorrida"
            variant="outlined"
            value={convertMetersToKilometersFormat(field.value)}
            onClick={() => setOpenDistanceSelect(true)}
            inputProps={{
              min: 0,
              step: 0.01,
              lang: 'en-US',
            }}
          />
        )}
      />

      <Controller
        name="durationInSeconds"
        control={control}
        render={({ field }) => (
          <RHFTextField
            InputProps={{
              readOnly: true, // Faz com que o campo seja apenas leitura
            }}
            name="durationInSeconds"
            label="Selecione o tempo"
            variant="outlined"
            value={convertSecondsToHourMinuteFormat(field.value)}
            onClick={() => setOpenTimeSelect(true)}
            inputProps={{
              min: 0,
              step: 0.01,
              lang: 'en-US',
            }}
          />
        )}
      />
    </>
  );
}
