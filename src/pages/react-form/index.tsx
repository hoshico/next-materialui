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
import { ChangeEvent, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Inputs = {
  title: string;
  description: string;
  important: boolean;
  score: number;
  date: Date | null;
};

const reactForm = () => {
  // ファイル関連
  const [file, setFile] = useState<File | null>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const showFolder = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

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

  console.log('ファイル情報: ', file);
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length !== 0) {
      setFile(files[0]);
    }
    e.target.value = '';
  };

  const { openSnackbar, closeSnackbar } = useSnackbar();

  // dataでアクセスできる
  const onSubmit = (data: Inputs) => {
    console.log('ファイル情報: ', file);
    console.log(data);
    openSnackbar({ text: '送信しました', severity: 'success' });
  };

  return (
    <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/*ControllerコンポーネントでReactHookFormを紐付け*/}
      <Box>
        {/*タイトル*/}
        <Grid container direction="column" gap={2}>
          <Grid item>
            <label htmlFor="title">テキスト入力</label>
          </Grid>
          <Grid item>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  id="title"
                  {...field}
                  type="text"
                  label="タイトル"
                  inputProps={{ required: 'タイトルを入力' }}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          {errors.title?.message && <p>{errors.title?.message}</p>}
        </Grid>
        {/*スコア*/}
        <Grid container direction="column" gap={2} mt={4}>
          <Grid item>
            <label htmlFor="score">数値入力</label>
          </Grid>
          <Grid>
            <Controller
              name="score"
              control={control}
              render={({ field }) => (
                <TextField
                  id="score"
                  {...field}
                  style={{ width: '150px' }}
                  type="number"
                  inputProps={{ min: 0, max: 20, step: '0.1' }}
                  label="スコア"
                />
              )}
            />
          </Grid>
        </Grid>
        {/*重要性*/}
        <Grid container direction="column" gap={2} mt={4}>
          <Grid item>
            <label htmlFor="important">チェックボックス</label>
          </Grid>
          <Grid>
            <Controller
              name="important"
              render={({ field }) => (
                <FormControlLabel
                  id="important"
                  label="重要性"
                  {...field}
                  control={<Checkbox />}
                />
              )}
              control={control}
            />
          </Grid>
        </Grid>
        {/*ファイル登録*/}
        <Grid>
          <Box hidden>
            <input
              type="file"
              accept=".png, .jpeg, .jpg "
              ref={filePickerRef}
              onChange={(e) => selectFile(e)}
              style={{ display: 'none' }}
            />
          </Box>
          <Button onClick={showFolder}>ファイル登録</Button>
        </Grid>
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
