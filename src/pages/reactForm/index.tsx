import { Box, Button, Grid, Stack, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

type Inputs = {
  title: string;
  importance: boolean;
  score: number;
  date: Date;
}
const reactForm = () => {
  const { control, handleSubmit } = useForm<Inputs>({
    /* 
      defaultValuesで初期値を設定
    */
    defaultValues: {
      title: '脆弱性',
      importance: false,
      score: 0,
      date: new Date(),
    }
  })
  /*
    検証ルール
    validationRulesで複数用意
  */
  const validationRules = {
    title: {
      required: '名前を入力してください',
      minLength: { value: 4, message: '4文字以上で入力してください。' }
    }
  }
  // dataでアクセスできる
  const onSubmit = (data: Inputs) => console.log(data)
  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/*ControllerコンポーネントでReactHookFormを紐付け*/}
      <Box>
        <Box>
          <Controller
            // nameはInputsで定義されてるkeyに制限される
            name="title"
            control={control}
            rules={validationRules.title}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="タイトル"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
        <Box mt={2}>
          <Controller
            name="importance"
            control={control}
            //rules={validationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="重要性"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
        <Box mt={2}>
          <Controller
            name="score"
            control={control}
            //rules={validationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="スコア"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
        <Box mt={2}>
          <Controller
            name="date"
            control={control}
            //rules={validationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="公開日"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
        <Grid mt={2}>
          <Button variant="contained" type="submit">
            確定
          </Button>
        </Grid>
      </Box>
    </Stack>
  )
}

export default reactForm
