import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

type Inputs = {
  title: string;
  important: boolean;
  score: number;
  score2: number;
  date: Date | null;
}
const reactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<Inputs>({
    /* 
      defaultValuesで初期値を設定
    */
    defaultValues: {
      title: '脆弱性タイトル',
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
      required: '名前を入力してください',
      minLength: { value: 4, message: '4文字以上で入力してください。' }
    },
    important: {},
    score: {
      min: 0,
      max: 10,
      maxLength: { value: 3, message: '4文字以上で入力してください。'}
    },
    score2: {
      min: 0,
      max: 10,
      maxLength: { value: 3, message: '3文字以下で入力してください。'}
    },
    date: {}
  }
  // dataでアクセスできる
  const onSubmit = (data: Inputs) => console.log(data)
  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/*ControllerコンポーネントでReactHookFormを紐付け*/}
      <Box>
        {/*タイトル*/}
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
        {/*重要性*/}
        <Box mt={2}>
          <Controller
            name="important"
            render={({ field }) => <FormControlLabel label="重要性" {...field} control={<Checkbox />} />}
            control={control}
          />
        </Box>
        {/*スコア*/}
        <Box mt={2}>
            <Controller
              name="score"
              control={control}
              rules={validationRules.score}
              render={({ field }) => (
                <TextField
                  {...field}
                  style={{ width: "150px"}}
                  type="number"
                  inputProps={{ min: 0, max: 20, step: '0.1' }}
                  label="スコア"
                  // !!falseyな値→false
                  error={!!formErrors.score}
                  helperText={formErrors.score ? 'scoreは0.0~10.0の間の数値である必要があります。' : ''}
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
                  style={{ width: "150px"}}
                  type="number"
                  inputProps={{ min: 0, max: 20, step: '0.1' }}
                  label="スコア2"
                  // !!falseyな値→false
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
        </Box>
        {/*公開日*/}
        {/*<Box mt={2}>
          <Controller
            name="date"
            control={control}
            rules={validationRules.date}
            render={({ field, fieldState }) => (
              
            )}
          />
        </Box>*/}
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
