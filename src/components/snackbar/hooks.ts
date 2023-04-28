import { AlertColor } from '@mui/material';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { RecoilAtomKeys } from '../../store/recoilKeys';

type SnackbarState = {
  isOpen: boolean;
  text: string;
  severity: AlertColor;
};

type SnackbarParams = Pick<SnackbarState, 'text' | 'severity'>;

export const snackbarStateAtom = atom<SnackbarState>({
  key: RecoilAtomKeys.SNACKBAR_STATE,
  default: {
    isOpen: false,
    text: '',
    severity: 'info'
  }
});

export const useSnackbar = () => {
  const setSnackbarState = useSetRecoilState(snackbarStateAtom);

  const openSnackbar = ({ text, severity }: SnackbarParams) => {
    setSnackbarState({
      isOpen: true,
      text,
      severity
    });
  };

  const closeSnackbar = () => {
    setSnackbarState({
      isOpen: false,
      text: '',
      severity: 'info'
    });
  };
  return { openSnackbar, closeSnackbar };
};

export const useCustomSnackbar = () => {
  const [snackbarState, setSnackbarState] = useRecoilState(snackbarStateAtom);

  return { snackbarState, setSnackbarState };
};
