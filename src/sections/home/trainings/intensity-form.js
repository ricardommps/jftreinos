import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
export default function IntensityForm({ unitMeasurement }) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'intensities',
  });

  const handleAdd = () => {
    append({
      value: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const clearIntensities = () => {
    fields.forEach(function (index) {
      remove(index);
    });
  };

  useEffect(() => {
    clearIntensities();
  }, [unitMeasurement]);

  return (
    <>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => {
          return (
            <Stack key={item.id} alignItems="flex-end" spacing={1.5} pt={2}>
              <Stack direction={'column'} spacing={2} sx={{ width: 1 }}>
                <RHFTextField
                  size="small"
                  name={`intensities[${index}].value`}
                  type="number"
                  label={<Box sx={{ textTransform: 'capitalize', m: 1 }}>{unitMeasurement}</Box>}
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={() => handleRemove(index)}
              >
                Remover
              </Button>
            </Stack>
          );
        })}
      </Stack>
      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Adicionar intensidade
        </Button>
      </Stack>
    </>
  );
}
