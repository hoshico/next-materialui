import * as yup from 'yup'
import { Button, Container, Stack, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  email: string
  name: string
  password: string
}

// バリデーションルール
const schema = yup.object({
  email: yup.string().required('必須です').email('正しいメールアドレス入力してくだいさい'),
  nama: yup.string().required('必須です'),
  password: yup
    .string()
    .required('必須です')
    .min(6, '文字数が少ないです')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/, 'パスワードが弱いです')
})

const FormYup = () => {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack spacing={3}>
        <TextField required label="メールアドレス" type="email" {...register('email')} />
        <TextField required label="お名前" {...register('name')} />
        <TextField required label="パスワード" type="password" {...register('password')} />
        <Button color="primary" variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
          作成
        </Button>
      </Stack>
    </Container>
  )
}

export default FormYup
