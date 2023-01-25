import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { TextFieldcontrol } from 'components/form/TextfieldControl';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ErrorSharp } from '@mui/icons-material';

type Inputs = {
  title: string;
};

const schema = z.object({
  title: z.string().min(1, { message: '１文字以上入力してください' }).max(10, { message: "10文字以内で入力"})
});

type InputsKeys = Array<keyof Inputs>;
const reactFormComponent = () => {
  const useFormMethods = useForm({
    defaultValues: {
      title: ''
    },
    resolver: zodResolver(schema)
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors }
  } = useFormMethods;

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <FormProvider {...useFormMethods}>
      <Stack m={4} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {/*ControllerコンポーネントでReactHookFormを紐付け*/}
        <Box>
          {/*タイトル*/}
          <Typography variant="h6">React-Hook-form</Typography>
          <Typography variant="subtitle1">親子関係のあるコンポーネントの実装</Typography>
          <Divider />
          <TextFieldcontrol name="title" />
          {errors.title?.message && <Typography variant='subtitle2' color="error">{errors.title?.message}</Typography>}
          {/*スコア*/}
          {/*<Box mt={2}>
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
        </Box>*/}
          <Grid mt={2}>
            <Grid container>
              <Grid>
                <Button type="submit" color="secondary" variant="contained">
                  送信
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default reactFormComponent;
