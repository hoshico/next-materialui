import { useFieldArray, useFormContext } from 'react-hook-form';
type Question = {
  id: any;
  answerType: any;
  labels?: string[];
  title: string;
};

export const FormList = () => {
  const { control, register } = useFormContext();
  const { fields } = useFieldArray({
    name: 'questions',
    control
  });
  // console.log(fields);
  console.log(fields[0]);
  return (
    <>
      {fields.map((field, index) => (

        <input key={field.id} type='text' {...register(`questions.${index}.title`)} />)
      )}
    </>
  );
};
