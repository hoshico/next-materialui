import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Modal } from 'components/modal/Modal';
import { useNotification } from 'components/snackbar/hooks';
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

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('value情報', e.target.value);
    console.log('target情報', e.target);
    const files = e.target.files;
    if (files && files.length !== 0) {
      setFile(files[0]);
    }
    //e.target.value = '';
  };

  const [showModal, setShowModal] = useState(false);
  const handlItem = (result: string) => {};

  const { onOpenNotification } = useNotification();

  // dataでアクセスできる
  const onSubmit = (data: Inputs) => {
    console.log('ファイル情報: ', file);
    console.log(data);
    onOpenNotification({ message: '送信しました', severity: 'success' });
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
        {/*モーダル*/}
        <Button variant="contained" onClick={() => setShowModal(true)}>
          テキスト入力モーダル
        </Button>
        <Modal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSelect={handlItem}
        />
        {/*ファイル登録*/}
        <Grid>
          <Box hidden>
            <input
              type="file"
              accept=".png, .jpeg, .jpg "
              ref={filePickerRef}
              onChange={(e) => selectFile(e)}
              hidden
            />
          </Box>
          <Button type="button" onClick={showFolder}>
            ファイル登録
          </Button>
          <Typography>{file?.name}</Typography>
          <Button type="button" onClick={() => setFile(null)}>
            ファイル削除
          </Button>
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
