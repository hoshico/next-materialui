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
  const { control, handleSubmit } = useFormMethods;

  const jvnArray = useWatch({
    control,
    name: 'jvn'
  });

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
            {jvnArray && jvnArray.map((jvn: string, index: number) => (
              <Typography key={index}>{jvn}</Typography>
            ))}
          </Box>
        </Box>
        <JvnDialog
          name="_inputJvn"
          index={jvnArray?.length || 0}
          open={open}
          closeDialog={closeDialog}
        />
        <Button type='submit'>チェック</Button>
      </Stack>
    </FormProvider>
  );
};

export default Dialog;
