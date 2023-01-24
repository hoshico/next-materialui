import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import { TextFieldcontrol } from 'components/form/TextfieldControl'
import { Controller, FormProvider, useForm } from 'react-hook-form'

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
  const filed1 = "title"
  const useFormMethods = useForm({
    defaultValues: {
      "title": ""
    }
  })
  const { setValue, handleSubmit } = useFormMethods
  //const {
  //  getValues,
  //  control,
  //  handleSubmit,
  //  unregister,
  //  formState: { errors }
  //} = useForm<Inputs>({
  //  mode: 'onChange',
  //  /*
  //    defaultValuesで初期値を設定
  //  */
  //  defaultValues: {
  //    title: '',
  //    title2: '',
  //    important: false,
  //    score: 0,
  //    score2: 0,
  //    date: new Date()
  //  }
  //})
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
    <FormProvider {...useFormMethods}>
      <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {/*ControllerコンポーネントでReactHookFormを紐付け*/}
        <Box>
          {/*タイトル*/}
          <Typography variant="h6">React-Hook-form</Typography>
          <Typography variant="subtitle1">親子関係のあるコンポーネントの実装</Typography>
          {/*<Box my={2}>
          <Typography variant="subtitle1">【概要】バリデーションについて考える</Typography>
          <Typography variant="subtitle1">⑴ validationRulesを設定(Controllerのnameで指定できる) </Typography>
          <Typography variant="subtitle1">⑵ controller内にrulresとして設定(formStateのerrors検知できる)</Typography>
          <Typography variant="subtitle1">⑶ TextField内のerrorにerrorsを使用(引っかかると枠の色が変わる。errorで⑵のerrorsを使用する。Booleanで使用する)</Typography>
          <Typography variant="subtitle1">⑷ エラーメッセージのフラグとしてerrors使用(Controller下に記述)</Typography>
          <Typography variant="subtitle1">⑸ このバリデーションをクリアしていないと送信押下しても反応なし</Typography>
        </Box>*/}
          <Divider />
          <TextFieldcontrol name="title" />

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
    </FormProvider>
  )
}

export default reactForm2
