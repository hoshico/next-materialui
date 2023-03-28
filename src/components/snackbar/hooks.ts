import { AlertColor } from '@mui/material';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { RecoilAtomKeys } from '../../store/recoilKeys';

type SnackbarState = {
  isOpen: boolean;
  text: string;
  severity: AlertColor;
};

type SnackbarParams = Pick<SnackbarState, 'text' | 'severity'>;

const snackbarStateAtom = atom<SnackbarState>({
  key: RecoilAtomKeys.SNACKBAR_STATE,
  default: {
    isOpen: false,
    text: '',
    severity: 'info'
  }
});
