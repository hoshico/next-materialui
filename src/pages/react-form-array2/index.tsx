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
  UseFormRegister
} from 'react-hook-form';

interface Question {
  questionText: string;
}

export interface QuestionForm {
  input: string;
  questions: Question[];
}

interface Props {
  register: UseFormRegister<QuestionForm>;
  questionIndex: number;
  removeQuestion: (index: number) => void;
}

const reactFormArray2 = () => {
  const { control, setValue, reset, getValues, register, handleSubmit } =
    useForm<QuestionForm>({
      defaultValues: {
        questions: []
      }
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const addQuestion = () => {
    append({ questionText: getValues().input });
    setValue('input', '');
  };

  const onSubmit = (data: QuestionForm) => {
    // keyを削除する
    console.log(data.questions.map((obj) => obj.questionText))
  };

  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box>
        {/*タイトル*/}
        <Stack mt={6} spacing={2}>
          <Typography variant="h4">fieldArrayの使用方法</Typography>
          <Box display="">
            <TextField {...register('input')} />
            <Button onClick={addQuestion}>追加</Button>
          </Box>
          {fields.map((field, index) => (
            <Typography key={field.id}>{field.questionText}</Typography>
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

export default reactFormArray2;
