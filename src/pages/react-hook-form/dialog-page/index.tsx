import { Box, Button, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import JvnDialog from 'components/use-form-hooks/dialog/Dialog';
import { useState } from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch
} from 'react-hook-form';

type Input = {
  input_jvn: string;
  jvn: string[];
};

const Dialog = () => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  const useFormMethods = useForm<Input>({
    defaultValues: {
      input_jvn: '',
      jvn: []
    }
  });
  const { control, setValue, handleSubmit } = useFormMethods;

  const jvnArray = useWatch({
    control,
    name: 'jvn'
  });
  const deleteJvn = (index: number) => {
    const newJvnArray = jvnArray.filter(
      (jvn: string, i: number) => i !== index
    );
    setValue('jvn', newJvnArray);
  };
  const onsubmit = (data: Input) => {
    console.log(data);
  };

  return (
    <FormProvider {...useFormMethods}>
      <Stack component="form" onSubmit={handleSubmit(onsubmit)}>
        <Box mt={4}>
          <Typography variant="h6">ダイアログ</Typography>
        </Box>
        <Box mt={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box mr={12}>
              <Typography>JVN</Typography>
            </Box>
            <Box>
              <Button variant="contained" onClick={openDialog}>
                追加
              </Button>
            </Box>
          </Box>
          <Box>
            {jvnArray &&
              jvnArray.map((jvn: string, index: number) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>{jvn}</Typography>
                  <Button onClick={() => deleteJvn(index)}>削除</Button>
                </Box>
              ))}
          </Box>
        </Box>
        <JvnDialog
          name="input_jvn"
          index={jvnArray?.length || 0}
          open={open}
          closeDialog={closeDialog}
        />
        <Button type="submit">チェック</Button>
      </Stack>
    </FormProvider>
  );
};

export default Dialog;
