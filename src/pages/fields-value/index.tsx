import { Button, Typography } from '@mui/material';
import { FormList } from 'components/fields-value/FormList';
import { FormProvider, useForm } from 'react-hook-form';

type Question = {
  id: any;
  answerType: any;
  labels?: string[];
  title: string;
};

type QuestionForm = {
  questions: Question[];
};

const FieldsValue = () => {
  const fomrMethods = useForm<QuestionForm>({
    defaultValues: {
      questions: [
        {
          id: 1,
          answerType: 2,
          labels: ['ある', 'わからない', 'ない'],
          title: '痛みはありますか？'
        },
        {
          id: 3,
          answerType: 1,
          labels: ['腰痛', '肩こり', '頭痛'],
          title: '痛部はどこですか？'
        },
        {
          id: 5,
          answerType: 3,
          title: '相談事項があれば記入してください'
        }
      ]
    }
  });
  const { handleSubmit } = fomrMethods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Typography>動的フォーム</Typography>
      <FormProvider {...fomrMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormList />
          <Button type="submit">送信</Button>
        </form>
      </FormProvider>
    </>
  );
};

export default FieldsValue;
