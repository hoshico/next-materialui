import { AlertColor } from '@mui/material';
import {
  atom,
  selectorFamily,
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

export const notificationStateAtom = atom<NotificationState>({
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
        set(notificationStateAtom, newState);
      }
  );

  const onCloseNotification = useRecoilCallback(({ set }) => () => {
    set(notificationStateAtom, (pre: NotificationState) => {
      return { ...pre, ...{ isOpen: false } };
    });
  });

  return {
    onOpenNotification,
    onCloseNotification
  };
};

//const notificationSelector = selectorFamily<
//  NotificationState | undefined,
//  { message: string; severity: AlertColor }
//>({
//  key: 'NotificationSelector',
//  get:
//    ({ message, severity }) =>
//    ({ get }) => {
//      const state = get(notificationStateAtom);
//      const newState: NotificationState = {
//        isOpen: true,
//        severity,
//        variant: 'standard',
//        message,
//        vertical: 'botton',
//        horizontal: 'center'
//      };
//      return newState;
//    }
//});
//
//const useNotification = () => {
//  const onOpenNotification = ({message, severity}) => {
//
//  }
//
//  return {onOpenNotification}
//};
//export const useCustomSnackbar = () => {
//  const [snackbarState, setSnackbarState] = useRecoilState(
//    notificationStateAtom
//  );
//
//  return { snackbarState, setSnackbarState };
//};
