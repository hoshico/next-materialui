import { useRecoilValue } from 'recoil';
import { snackbarStateAtom, useSnackbar } from './hooks';
import { Alert, Snackbar } from '@mui/material';

const NotificationBar = () => {
  const { closeSnackbar } = useSnackbar();
  const notificationState = useRecoilValue(snackbarStateAtom);
  const { isOpen, text, severity } = notificationState;

  if (!notificationState) return null;
  return (
    <Snackbar open={isOpen} onClose={closeSnackbar}>
      <Alert variant="filled" onClose={closeSnackbar} security={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default NotificationBar;
