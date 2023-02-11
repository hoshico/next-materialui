import { Box, FormControl, InputLabel, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export const TextFieldcontrol = ({ name }: { name: string }) => {
  const { control } = useFormContext();
  return (
    <>
      <Box>
        <InputLabel variant="filled" shrink htmlFor={name}>
          {name}
        </InputLabel>
      </Box>
      <FormControl variant="standard">
        <Controller
          name={name}
          control={control}
          render={({ field }) => <TextField id={name} {...field} />}
        ></Controller>
      </FormControl>
    </>
  );
};
