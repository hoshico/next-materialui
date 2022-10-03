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
  date: Date | null;
}
const reactForm = () => {
  const { control, handleSubmit } = useForm<Inputs>({
    /* 
      defaultValuesで初期値を設定
    */
    defaultValues: {
      title: '脆弱性タイトル',
      important: false,
      score: 0,
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
    score: {},
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
            render={({ field, fieldState }) => <FormControlLabel label="重要性" {...field} control={<Checkbox />} />}
            control={control}
          />
        </Box>
        {/*スコア*/}
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
