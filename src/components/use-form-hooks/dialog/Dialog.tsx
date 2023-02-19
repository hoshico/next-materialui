import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField
} from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

type Props = {
  name: string;
  index: number;
  open: boolean;
  closeDialog: () => void;
};

const JvnDialog = ({ name, index, open, closeDialog }: Props) => {
  const inputText = (e: any) => {
    console.log(e.target.value);
  };

  const { control, setValue, reset } = useFormContext();

  // ダイアログの入力値取得
  const jvnInput = useWatch({
    control,
    name
  });

  const register = () => {
    // jvnの配列の最後に入力値を追加する
    setValue(`jvn.${index}`, jvnInput);
    setValue(name, "");
    closeDialog();
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent sx={{ width: '500px' }}>
        <DialogContentText id="alert-dialog-description">
          JVN登録
        </DialogContentText>
        <Controller
          control={control}
          name={name}
          render={({ field }) => <TextField {...field} />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>キャンセル</Button>
        <Button onClick={register} autoFocus>
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JvnDialog;
