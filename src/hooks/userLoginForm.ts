import { useForm } from 'react-hook-form';

export const UseLoginForm = () => {
  const { register, handleSubmit, watch, formState } = useForm({
    mode: 'onChange'
  });

  return {
    register,
    handleSubmit,
    watch,
    formState
  };
};
