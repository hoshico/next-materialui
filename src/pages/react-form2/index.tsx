import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

type Inputs = {
  title: string
  title2: string
  description: string
  important: boolean
  score: number
  score2: number
  date: Date | null
}
type InputsKeys = Array<keyof Inputs>
const reactForm2 = () => {
  const {
    getValues,
    control,
    handleSubmit,
    unregister,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange',
    /* 
      defaultValuesで初期値を設定
    */
    defaultValues: {
      title: '',
      title2: '',
      important: false,
      score: 0,
      score2: 0,
      date: new Date()
    }
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
        <Box my={2}>
          <Typography variant="subtitle1">【概要】バリデーションについて考える</Typography>
          <Typography variant="subtitle1">⑴ validationRulesを設定 → controller内にrulresとして設定</Typography>
          <Typography variant="subtitle1">⑵ </Typography>
          <Typography variant="subtitle1">⑶このバリデーションをクリアしていないと送信押下しても反応なし</Typography>
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
        {/*スコア*/}
        {/*<Box mt={2}>
          <Controller
            name="score"
            control={control}
            rules={validationRules.score}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                style={{ width: '150px' }}
                type="number"
                inputProps={{ min: 0, max: 20, step: '0.1' }}
                label="スコア"
                // !!falseyな値→false
                error={!!errors.score}
                helperText={validationRules.score?.maxLength.message}
              />
            )}
          />
        </Box>*/}
        {/*スコア*/}
        {/*<Box mt={2}>
          <Controller
            name="score2"
            control={control}
            rules={validationRules.score2}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                style={{ width: '150px' }}
                type="text"
                inputProps={{ min: 0, max: 20, step: '0.1' }}
                label="スコア2"
                // !!falseyな値→false
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>*/}
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

export default reactForm2
