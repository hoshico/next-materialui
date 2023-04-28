import { useRecoilValue } from 'recoil';
import { notificationStateAtom, useNotification } from './hooks';
import { Alert, Snackbar } from '@mui/material';

const NotificationBar = () => {
  const { onCloseNotification } = useNotification();
  const notificationState = useRecoilValue(notificationStateAtom);
  const { isOpen, message, severity } = notificationState;

  if (!notificationState) return null;
  return (
    <Snackbar open={isOpen} onClose={onCloseNotification}>
      <Alert variant="filled" onClose={onCloseNotification} security={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationBar;
