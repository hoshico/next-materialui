import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

type Inputs = {
  title: string
  description: string
  important: boolean
  score: number
  score2: number
  date: Date | null
}
type InputsKeys = Array<keyof Inputs>
const reactFormNumber = () => {
  const {
    getValues,
    watch,
    control,
    handleSubmit,
    unregister,
    formState: { errors, isDirty, dirtyFields, isValid }
  } = useForm<Inputs>({
    mode: 'onChange',
    /* 
      defaultValuesで初期値を設定
    */
    defaultValues: {
      title: 'react-hook-form',
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
    score: {
      max: { value: 10, message: "10以下で入力"},
      min: { value: 0, message: '0以上で入力' },
      minLength: { value: 2, message: '少数第一位までで入力' },
      maxLength: { value: 3, message: '少数第一位までで入力' },
    },
    score2: {
      min: 0,
      max: 10,
      maxLength: { value: 3, message: '3文字以下で入力してください。' }
    }
  }
  // dataでアクセスできる
  const onSubmit = (data: Inputs) => {
    console.log(data)
  }

  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/*ControllerコンポーネントでReactHookFormを紐付け*/}
      <Box>
        {/*スコア*/}
        <Box mt={2}>
          <Controller
            name="score"
            control={control}
            rules={validationRules.score}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                style={{ width: '150px' }}
                type="number"
                inputProps={{ min: 0, max: 10, step: '0.1' }}
                label="スコア"
                // !!falseyな値→false
                error={Boolean(errors.score)}
              />
            )}
          />
          {errors.score?.message && <Typography variant='subtitle2' color="error">{errors.score.message}</Typography>}
        </Box>
        {/*スコア*/}
        <Box mt={2}>
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

export default reactFormNumber
