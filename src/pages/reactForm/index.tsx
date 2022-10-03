import { Button, Grid, Stack, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

type Inputs = {
  name: string
  number: string
  age: number
}
const reactForm = () => {
  const { control, handleSubmit } = useForm<Inputs>({
    /* 
      defaultValuesで初期値を設定
    */
    defaultValues: {
      name: 'yasu',
      number: '090-2222-5555',
      age: 35
    }
  })
  /*
    検証ルール
    validationRulesで複数用意
  */
  const validationRules = {
    name: {
      required: '名前を入力してください',
      minLength: { value: 4, message: '4文字以上で入力してください。' }
    }
  }
  const onSubmit = (data: Inputs) => console.log(data)
  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/*ControllerコンポーネントでReactHookFormを紐付け*/}
      <Grid container alignItems="center">
        <Grid>
          <Controller
            name="name"
            control={control}
            rules={validationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="名前"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid ml={2}>
          <Button variant="contained" type="submit">
            確定
          </Button>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default reactForm
