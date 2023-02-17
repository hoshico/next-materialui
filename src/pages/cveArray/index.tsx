import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  Container,
  FormLabel
} from '@mui/material';
import { getValue } from '@mui/system';
import { useMemo } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
  UseFormRegister
} from 'react-hook-form';

export interface BaseForm {
  cweList: string[];
}

type FormValues = {
  cweList: string[];
};

const cveArray = () => {
  const {
    reset,
    getValues,
    setValue,
    control,
    register,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm();

  const { fields } = useFieldArray({
    control,
    name: 'test'
  });

  const onSubmit = (data: any) => {
    console.log('data情報: ', data);
  };
  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box>
        {/*タイトル*/}
        <Typography variant="h4">fieldArrayの使用方法</Typography>
        <Stack mt={6} spacing={2}>
          <Box display={'flex'}>
            {fields.map((field, index) => (
              <TextField
                key={field.id}
                {...register(`cweList.${index}.value`)}
              />
            ))}
            <TextField {...register("")} />
            {/*<Box>
              <Button onClick={addCwe}>追加</Button>
            </Box>*/}
          </Box>

          <Typography>{getValues().cweList}</Typography>
          {/*<Box display={'flex'}>
            <TextField {...register('cweList.0')} />
            <Box>
              <Button onClick={addCwe}>追加</Button>
            </Box>
          </Box>
          <Box display={'flex'}>
            <TextField {...register('cweList.1')} />
            <Box>
              <Button onClick={addCwe}>追加</Button>
            </Box>
          </Box>
          <Box display={'flex'}>
            <TextField {...register('cweList.2')} />
            <Box>
              <Button onClick={addCwe}>追加</Button>
            </Box>
          </Box>*/}
        </Stack>
        {/*cwe追加ボタン*/}
        {/*送信ボタン*/}
        <Box mt={6}>
          <Button type="submit" color="secondary" variant="contained">
            送信
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default cveArray;
