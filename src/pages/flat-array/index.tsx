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
import { useMemo } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
  UseFormRegister,
  useWatch
} from 'react-hook-form';

type cweList = {
  cwe: string[];
};
type inputForm = {
  input_cve: string;
  input_cwe: string;
  input_cweList: string[];
  cweList: cweList[];
  cveList: {
    cve: string;
    cweList: string[];
  }[]
};

interface Props {
  register: UseFormRegister<inputForm>;
  questionIndex: number;
  removeQuestion: (index: number) => void;
}

const flatArray = () => {
  const { control, setValue, reset, getValues, register, handleSubmit } =
    useForm<inputForm>({
      defaultValues: {
        input_cwe: '',
        input_cweList: [],
        cweList: [],
        cveList: []
      }
    });

  const questionsArray = useWatch({ name: 'input_cweList', control });
  const index = questionsArray.length;
  const addQuestion = () => {
    setValue(`input_cweList.${index}`, getValues().input_cwe);
    setValue('input_cwe', '');
  };

  const cveListArray = useWatch({ name: 'cveList', control });
  const cveIndex = cveListArray.length;
  const onSubmit = (data: inputForm) => {
    const newCveList = {
      cve: data.input_cve,
      cweList: data.input_cweList,
    }
    setValue(`cveList.${cveIndex}`, newCveList)
    // input_cewe/input_cweList/cweList のリセット
  };

  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box>
        {/*タイトル*/}
        <Stack mt={6} spacing={2}>
          <Typography variant="h4">fieldArrayの使用方法</Typography>
          <Box sx={{ flexDirection: 'column' }}>
            <Box mt={4}>
              <TextField {...register('input_cve')} />
            </Box>
            <Box mt={4}>
              <TextField {...register('input_cwe')} />
            </Box>
            <Button onClick={addQuestion}>追加</Button>
          </Box>
          {questionsArray.map((field, index) => (
            <Typography key={index}>{field}</Typography>
          ))}
        </Stack>
        {/*質問追加ボタン*/}
        {/*<Box>
          <Button onClick={addQuestion}>質問を追加</Button>
        </Box>
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

export default flatArray;
