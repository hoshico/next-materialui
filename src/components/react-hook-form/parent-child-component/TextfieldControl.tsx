import { Box, FormControl, InputLabel, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export const TextFieldcontrol = ({ name }: { name: string }) => {
  const { control } = useFormContext();
  return (
    <Box mt={4}>
      <Typography>{name}</Typography>
      <FormControl variant="standard">
        <Controller name={name} control={control} render={({ field }) => <TextField id={name} {...field} />} />
      </FormControl>
    </Box>
  );
};
