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
  date: Date | null;
};

const reactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields, isValid }
  } = useForm<Inputs>({
    /* 
      defaultValuesで初期値を設定
    */
    defaultValues: {
      title: '',
      important: false,
      score: 0,
      date: new Date()
    }
  });

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
            name="title"
            control={control}
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
            name="description"
            control={control}
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
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                style={{ width: '150px' }}
                type="number"
                inputProps={{ min: 0, max: 20, step: '0.1' }}
                label="スコア"
                // !!falseyな値→false
                //error={!!errors.score}
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
