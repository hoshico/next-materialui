import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
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
  // dataでアクセスできる
  const onSubmit = (data: Inputs) => {
    console.log(data)
    const key = Object.keys(getValues()) as InputsKeys
    unregister(key, { keepDirty: false })
  }
  const onClcikGet = () => console.log(getValues())
  const onCheckDirty = () => {
    // dirtyFieldsでコントロール下の変更要素がわかる
    console.log(dirtyFields)

    // isDirtyでコントロール下の何かが変更
    console.log(isDirty)
  }

  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/*ControllerコンポーネントでReactHookFormを紐付け*/}
      <Box>
        {/*タイトル*/}
        <Typography variant="h4">React-Hook-form</Typography>
        <Box my={2}>
          <Typography variant="subtitle1">【概要】バリデーションについて考える</Typography>
        </Box>
        <Divider />
        <Box mt={4}>
          <Typography variant="h6">①TextField</Typography>
        </Box>
        <Box mt={2}>
          <Typography color="red" variant="subtitle2">
            error & helperTextパターン
          </Typography>
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
                inputProps={{ required: 'タイトルを入力' }}
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
          <Typography color="red" variant="subtitle2">
            error.○○.messageパターン
          </Typography>
        </Box>
        <Box>
          <Controller
            // nameはInputsで定義されてるkeyに制限される
            name="title2"
            control={control}
            rules={validationRules.title}
            render={({ field, fieldState }) => (
              <TextField {...field} type="text" label="タイトル" inputProps={{ required: 'タイトルを入力' }} />
            )}
          />
          {errors.title2?.message && <Typography color="red">{errors.title2?.message}</Typography>}
        </Box>
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
                inputProps={{ min: 0, max: 20, step: '0.1' }}
                label="スコア"
                // !!falseyな値→false
                error={!!errors.score}
                helperText={validationRules.score?.maxLength.message}
              />
            )}
          />
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
              <Button variant="contained" onClick={onCheckDirty}>
                isDirty
              </Button>
            </Grid>
            <Grid ml={2}>
              {/*タイトルが"脆弱性"だと押下できる*/}
              <Button disabled={watch('title') !== '脆弱性'} variant="contained" onClick={onClcikGet}>
                watch
              </Button>
            </Grid>
          </Grid>
          <Grid mt={2} container>
            <Grid>
              {/*タイトルが"脆弱性"だと押下できる*/}
              <Button variant="contained" onClick={onCheckDirty}>
                isDirty
              </Button>
            </Grid>
            <Grid ml={2}>
              {/*タイトルが"脆弱性"だと押下できる*/}
              <Button variant="contained" type="submit">
                確定
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}

export default reactForm2
