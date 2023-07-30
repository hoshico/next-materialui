import { Button } from '@mui/material';
import { CheckBox } from 'components/check-box';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

type Question = {
  id: string;
  name: string;
  chceked: boolean;
  disabled: boolean;
};

const CheckForm = () => {
  const title = '痛部はどこですか？';
  const labels = ['腰痛', '肩こり', '頭痛'];

  return <CheckBox title={title} labels={labels} />;
};

export default CheckForm;
