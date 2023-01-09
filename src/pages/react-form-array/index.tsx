import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

type Inputs = {
  title: string
  title2: string
  description: string
  important: boolean
  score: number
  score2: number
  date: Date | null
  categoryStatus: {
    id: string
    status: string
  }[]
}
type InputsKeys = Array<keyof Inputs>
const id = "aaa"
const id2 = "bbb"
const reactFormArray = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      title2: '',
      important: false,
      score: 0,
      score2: 0,
      date: new Date()
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categoryStatus'
  })
  /*
    検証ルール
    validationRulesで複数用意
  */
  const validationRules = {
    title: {
      required: 'タイトルを入力してください',
      minLength: { value: 3, message: '3文字以上で入力してください。' }
    },
    title2: {
      required: 'タイトルを入力してください',
      minLength: { value: 3, message: '3文字以上で入力してください。' }
    },
    score2: {
      min: 0,
      max: 10,
      maxLength: { value: 3, message: '3文字以下で入力してください。' }
    },
    date: {}
  }
  // dataでアクセスできる
  const onSubmit = (data: Inputs) => {
    console.log(data)
  }

  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/*ControllerコンポーネントでReactHookFormを紐付け*/}
      <Box>
        {/*タイトル*/}
        <Typography variant="h4">React-Hook-form</Typography>
        <Typography variant="h4">useFieldArray</Typography>
        <Box my={2}>
          {/*<Typography variant="subtitle1">【概要】バリデーションについて考える</Typography>
          <Typography variant="subtitle1">⑴ validationRulesを設定(Controllerのnameで指定できる) </Typography>
          <Typography variant="subtitle1">⑵ controller内にrulresとして設定(formStateのerrors検知できる)</Typography>
          <Typography variant="subtitle1">⑶ TextField内のerrorにerrorsを使用(引っかかると枠の色が変わる。errorで⑵のerrorsを使用する。Booleanで使用する)</Typography>
          <Typography variant="subtitle1">⑷ エラーメッセージのフラグとしてerrors使用(Controller下に記述)</Typography>
          <Typography variant="subtitle1">⑸ このバリデーションをクリアしていないと送信押下しても反応なし</Typography>*/}
        </Box>
        <Divider />
        <Box mt={4}>
          <Typography variant="h6">①TextField</Typography>
        </Box>
        <Box my={2}>
          <Typography variant="subtitle2">・error & helperTextパターン(非推奨)</Typography>
        </Box>
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
        <Box mt={4}>
          <Typography variant="h6">②TextField</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle2">・error.○○.messageパターン</Typography>
        </Box>
        <Box>
          <Controller
            name="title2"
            control={control}
            rules={validationRules.title2}
            render={({ field }) => (
              <TextField {...field} error={Boolean(errors.title2?.message)} type="text" label="タイトル" />
            )}
          />
          {errors.title2?.message && (
            <Typography variant="subtitle2" color="red">
              {errors.title2?.message}
            </Typography>
          )}
        </Box>
        <Box mt={4}>
          <Typography variant="h6">③fieldArray</Typography>
        </Box>
        <Box mt={2}>
          <Controller
            name={`categoryStatus.${id}`}
            control={control}
            render={({ field }) => <TextField {...field} type="text" label="タイトル" />}
          />
        </Box>
        <Box mt={2}>
          <Controller
            name={`categoryStatus.${id2}`}
            control={control}
            render={({ field }) => <TextField {...field} type="text" label="タイトル" />}
          />
        </Box>
        <Grid mt={2}>
          <Grid container>
            <Grid>
              <Button type="submit" color="secondary" variant="contained">
                送信
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}

export default reactFormArray
