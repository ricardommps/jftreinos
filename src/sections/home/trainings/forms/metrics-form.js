import { Controller, useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
export default function MetricsForm() {
  const { control } = useFormContext();
  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }
  return (
    <>
      <Controller
        name="distance"
        control={control}
        render={({ field }) => (
          <RHFTextField
            name="distance"
            label="Distância em metros *"
            variant="outlined"
            type="number"
            helperText={`${Number(field.value) / 1000} km`}
          />
        )}
      />

      <Controller
        name="duration"
        control={control}
        render={({ field }) => (
          <RHFTextField
            name="duration"
            label="Tempo total em minutos *"
            variant="outlined"
            type="number"
            helperText={toHoursAndMinutes(Number(field.value))}
          />
        )}
      />
    </>
  );
}
