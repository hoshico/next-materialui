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
  questions: Question[];
}

interface Props {
  register: UseFormRegister<QuestionForm>;
  questionIndex: number;
  removeQuestion: (index: number) => void;
}

// 子コンポーネント
const QuestionItem = ({ register, questionIndex, removeQuestion }: Props) => {
  return (
    <Box>
      <FormLabel>{questionIndex + 1}</FormLabel>
      <TextField {...register(`questions.${questionIndex}.questionText`)} />
      <Button onClick={() => removeQuestion(questionIndex)}>削除</Button>
    </Box>
  );
};

const reactFormArray = () => {
  const { control, register, handleSubmit } = useForm<QuestionForm>({
    defaultValues: {
      questions: [{ questionText: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const addQuestion = () => {
    append({ questionText: '' });
  };

  const removeQuestion = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: QuestionForm) => {
    console.log('data情報: ', data);
  };

  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box>
        {/*タイトル*/}
        <Stack mt={6} spacing={2}>
          <Typography variant="h4">fieldArrayの使用方法</Typography>
          {fields.map((field, index) => (
            <QuestionItem
              key={field.id}
              register={register}
              questionIndex={index}
              removeQuestion={removeQuestion}
            />
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

export default reactFormArray;
