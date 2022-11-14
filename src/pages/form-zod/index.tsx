import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  email: string
  name: string
  password: string
}
type InputsKeys = Array<keyof Inputs>
const FormZod = () => {
  const { register, handleSubmit } = useForm<Inputs>()
  
  const validationRules = {
    title: {
      required: 'タイトルを入力してください',
      minLength: { value: 3, message: '3文字以上で入力してください。' }
    },
    description: {
      required: '概要を入力してください',
      minLength: { value: 3, message: '3文字以上で入力してください。' }
    },
    important: {},
    score: {
      min: 0,
      max: 10,
      maxLength: { value: 3, message: '4文字以上で入力してください。' }
    },
    score2: {
      min: 0,
      max: 10,
      maxLength: { value: 3, message: '3文字以下で入力してください。' }
    },
    date: {}
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack spacing={3}>
        <TextField required label="メールアドレス" type="email" {...register('email')}/>
        <TextField required label="お名前" {...register('name')}/>
        <TextField required label="パスワード" type="password" {...register('password')}/>
        <Button color="primary" variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
          作成
        </Button>
      </Stack>
    </Container>
  )
}

export default FormZod
