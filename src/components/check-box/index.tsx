import { Button } from '@mui/material';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

type Question = {
  id: string;
  name: string;
  chceked: boolean;
  disabled: boolean;
};

type Props = {
  title: string;
  labels: string[];
};

export const CheckBox = (props: Props) => {
  const { title, labels } = props;

  const {
    register,
    watch,
    handleSubmit,
    formState: { isDirty, dirtyFields }
  } = useForm({
    mode: 'onChange'
  });
  console.log(watch()[title]);
  const disabled = watch()[title]?.length > 0;

  const onSubmit = (data: any) => {
    console.log(data[title]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {labels.map((label, index) => (
          <Fragment key={index}>
            <label htmlFor={label}>
              <input
                {...register(title)}
                type="checkbox"
                value={label}
                id={label}
              />
              {label}
            </label>
          </Fragment>
        ))}
        <Button disabled={!disabled} type="submit">
          送信
        </Button>
      </form>
    </>
  );
};
