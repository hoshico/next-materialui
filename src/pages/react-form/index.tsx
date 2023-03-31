import {
  ErrorSharp,
  InputSharp,
  ResetTv,
  Score,
  SettingsOverscanOutlined
} from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import { useSnackbar } from 'components/snackbar/hooks';
import { Controller, useForm } from 'react-hook-form';

type Inputs = {
  title: string;
  description: string;
  important: boolean;
  score: number;
  score2: number;
  date: Date | null;
};
type InputsKeys = Array<keyof Inputs>;

const reactForm = () => {
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
  });
  /*
    検証ルール
    validationRulesで複数用意
  */

  const { openSnackbar, closeSnackbar } = useSnackbar();

  // dataでアクセスできる
  const onSubmit = (data: Inputs) => {
    console.log('hihi');
    console.log(data);
    openSnackbar({ text: '送信しました', severity: 'success' });
  };

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
            //rules={validationRules.title}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="タイトル"
                inputProps={{ required: 'タイトルを入力' }}
                helperText={fieldState.error?.message}
              />
            )}
          />
          {errors.title?.message && <p>{errors.title?.message}</p>}
        </Box>
        {/*概要*/}
        <Box mt={2}>
          <Controller
            // nameはInputsで定義されてるkeyに制限される
            name="description"
            control={control}
            //rules={validationRules.description}
            render={({ field, fieldState }) => (
              <TextField
                //{...field}
                type="text"
                label="概要"
                //inputProps={{ required: 'タイトルを入力' }}
                //error={fieldState.invalid}
                //helperText={fieldState.error?.message}
                //{...(fieldState.error && <p>{fieldState.error.message}</p>)}
              />
            )}
          />
        </Box>
        {/*重要性*/}
        <Box mt={2}>
          <Controller
            name="important"
            render={({ field }) => (
              <FormControlLabel
                label="重要性"
                {...field}
                control={<Checkbox />}
              />
            )}
            control={control}
          />
        </Box>
        {/*スコア*/}
        <Box mt={2}>
          <Controller
            name="score"
            control={control}
            //rules={validationRules.score}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                style={{ width: '150px' }}
                type="number"
                inputProps={{ min: 0, max: 20, step: '0.1' }}
                label="スコア"
                // !!falseyな値→false
                error={!!errors.score}
                //helperText={validationRules.score?.maxLength.message}
              />
            )}
          />
        </Box>
        {/*スコア*/}
        <Box mt={2}>
          <Controller
            name="score2"
            control={control}
            //rules={validationRules.score2}
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
          <Grid mt={2} container>
            <Grid ml={2}>
              <Button type="submit" variant="contained">
                確定
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default reactForm;
