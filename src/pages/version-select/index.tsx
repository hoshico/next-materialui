import { ErrorSharp, InputSharp, ResetTv, Score, SettingsOverscanOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useMemo, useState } from 'react'
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
const versionSelect = () => {
  const formContents = [
    {
      title: 'タイトルサンプル01',
      important: false,
      score: 0,
      score2: 0,
      date: new Date('2022-11-01')
    },
    {
      title: 'タイトルサンプル02',
      important: true,
      score: 2,
      score2: 2,
      date: new Date('2022-11-02')
    },
    {
      title: 'タイトルサンプル03',
      important: true,
      score: 3,
      score2: 3,
      date: new Date('2022-11-03')
    }
  ]
  
  const [version, setVersion] = useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value)
  }
  const formContent = useMemo(() => {
    return formContents[version]
  }, [version])

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
      title: formContent.title || '',
      important: formContent.important || false,
      score: formContent.score || 0,
      score2: formContent.score2 || 0,
      date: formContent.date || new Date()
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
    const key = Object.keys(getValues()) as InputsKeys
    //const arr = getValues();
    //type Arry = keyof typeof arr;
    //const key = Object.keys(getValues())
    //unregister(["title", "important", "score", "score2"], {keepDirty: false});
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
        <Box mb={3}>
          <Typography>現在のversion: {version}</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">version</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={version}
              onChange={handleChange}
              label="version"
            >
              <MenuItem value={0}>1.00</MenuItem>
              <MenuItem value={1}>2.00</MenuItem>
              <MenuItem value={2}>3.00</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
                inputProps={{ required: 'タイトルを入力' }}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
        {/*概要*/}
        <Box mt={2}>
          <Controller
            // nameはInputsで定義されてるkeyに制限される
            name="description"
            control={control}
            rules={validationRules.description}
            render={({ field, fieldState }) => (
              <TextField
                //{...field}
                type="text"
                label="概要"
                //inputProps={{ required: 'タイトルを入力' }}
                //error={fieldState.invalid}
                //helperText={fieldState.error?.message}
                {...(fieldState.error && <p>{fieldState.error.message}</p>)}
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

export default versionSelect
