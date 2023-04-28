import { atom } from 'recoil';

export const notificationAtom = atom({
  key: 'Notification',
  default: {
    isOpen: false,
    severity: 'success',
    variant: 'standard',
    message: '',
    vertical: 'botton',
    horizontal: 'center'
  }
});
