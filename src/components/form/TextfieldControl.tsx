import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export const TextFieldcontrol = ({ name }: { name: string }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  return (
    <Controller
      name={name}
      //rules={}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
        />
      )}
    ></Controller>
  );
};
