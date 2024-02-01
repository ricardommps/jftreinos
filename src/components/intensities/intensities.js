import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
export default function Intensities({ intensitiesData, unitmeasurement }) {
  const renderIntensities = () => {
    const intensities = intensitiesData.map((intensities) => JSON.parse(intensities));
    const intensitiesValues = intensities.map((item) => {
      if (item.value) {
        return item.value;
      }
      return item.intensitie;
    });
    const noEmptyValues = intensitiesValues.filter((str) => str !== '');
    return (
      <Box display="grid" gap={2} gridTemplateColumns="repeat(3, 1fr)" width={'30px'}>
        {noEmptyValues.map((item, index) => (
          <Badge badgeContent={index + 1} color="info" key={`intensities-badge-key-${index}`}>
            <Chip
              label={`${item} ${unitmeasurement === 'pace' ? 'min' : 'km/h'}`}
              key={`intensities-key-${index}`}
              sx={{ width: '100px' }}
            />
          </Badge>
        ))}
      </Box>
    );
  };
  return <>{renderIntensities()}</>;
}
