import { Button } from '@mui/material';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

type Question = {
  id: string;
  name: string;
  chceked: boolean;
  disabled: boolean;
};

const RadioForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields }
  } = useForm();
  console.log(isDirty);
  console.log(dirtyFields);
  // const ex = {
  //   id: 1,
  //   answerType: 2,
  //   labels: ['ある', 'わからない', 'ない'],
  //   title: '痛みはありますか？'
  // }

  const labels = [
    {
      id: 1,
      name: 'ある',
      checked: false,
      required: false
    },
    {
      id: 2,
      name: 'わからない',
      checked: false,
      required: false
    },
    {
      id: 1,
      name: 'ない',
      checked: false,
      required: false
    }
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {labels.map((label, index) => (
          <Fragment key={index}>
            <input type="radio" id={label.name} {...register()} />
            <label htmlFor={label.name}>{label.name}</label>
          </Fragment>
        ))} */}
        <label htmlFor="1">
          <input
            {...register('痛みはありますか？')}
            type="radio"
            value="ある"
            id="1"
          />
          ある
        </label>
        <label htmlFor="2">
          <input
            {...register('痛みはありますか？')}
            type="radio"
            value="わからない"
            id="2"
          />
          わからない
        </label>
        <label htmlFor="3">
          <input
            {...register('痛みはありますか？')}
            type="radio"
            value="ない"
            id="3"
          />
          ない
        </label>
        <Button disabled={!isDirty} type="submit">送信</Button>
      </form>
    </>
  );
};

export default RadioForm;
