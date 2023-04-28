import { AlertColor } from '@mui/material';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { RecoilAtomKeys } from '../../store/recoilKeys';

type SnackbarState = {
  isOpen: boolean;
  severity: AlertColor;
  variant: 'standard';
  message: string;
  vertical: 'botton';
  horizontal: 'center';
};

type SnackbarParams = Pick<SnackbarState, 'message' | 'severity'>;

export const snackbarStateAtom = atom<SnackbarState>({
  key: RecoilAtomKeys.SNACKBAR_STATE,
  default: {
    isOpen: false,
    severity: 'success',
    variant: 'standard',
    message: '',
    vertical: 'botton',
    horizontal: 'center'
  }
});

export const useNotification = () => {
  const [notificationState, setNotificationState] =
    useRecoilState(snackbarStateAtom);

  const onOpenNotification = ({ message, severity }: SnackbarParams) => {
    setNotificationState({
      isOpen: true,
      severity,
      variant: 'standard',
      message,
      vertical: 'botton',
      horizontal: 'center'
    });
  };

  const onCloseNotification = () => {
    setNotificationState({ ...notificationState, ...{ isOpen: false } });
  };
  return { onOpenNotification, onCloseNotification };
};

export const useCustomSnackbar = () => {
  const [snackbarState, setSnackbarState] = useRecoilState(snackbarStateAtom);

  return { snackbarState, setSnackbarState };
};
