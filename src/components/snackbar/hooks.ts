import { AlertColor } from '@mui/material';
import {
  atom,
  useRecoilCallback,
  useRecoilState,
  useSetRecoilState
} from 'recoil';
import { RecoilAtomKeys } from '../../store/recoilKeys';

type NotificationState = {
  isOpen: boolean;
  severity: AlertColor;
  variant: 'standard';
  message: string;
  vertical: 'botton';
  horizontal: 'center';
};

type SnackbarParams = Pick<NotificationState, 'message' | 'severity'>;

export const snackbarStateAtom = atom<NotificationState>({
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
//
//export const useNotification = () => {
//  const [notificationState, setNotificationState] =
//    useRecoilState(snackbarStateAtom);
//
//  const onOpenNotification = ({ message, severity }: SnackbarParams) => {
//    setNotificationState({
//      isOpen: true,
//      severity,
//      variant: 'standard',
//      message,
//      vertical: 'botton',
//      horizontal: 'center'
//    });
//  };
//
//  const onCloseNotification = () => {
//    setNotificationState({ ...notificationState, ...{ isOpen: false } });
//  };
//  return { onOpenNotification, onCloseNotification };
//};

export const useNotification = () => {
  const [notificationState, setNotificationState] =
    useRecoilState(snackbarStateAtom);
  // state変更処理
  const onOpenNotification = useRecoilCallback(
    ({ set }) =>
      (args: SnackbarParams) => {
        const { message, severity } = args;
        const newState: NotificationState = {
          isOpen: true,
          severity,
          variant: 'standard',
          message,
          vertical: 'botton',
          horizontal: 'center'
        };
        set(snackbarStateAtom, newState);
      }
  );

  const onCloseNotification = useRecoilCallback(({ reset }) => () => {
    //set(snackbarStateAtom, (preState) => preState);
    reset(snackbarStateAtom);
  });

  return {
    onOpenNotification,
    onCloseNotification
  };
};

export const useCustomSnackbar = () => {
  const [snackbarState, setSnackbarState] = useRecoilState(snackbarStateAtom);

  return { snackbarState, setSnackbarState };
};
