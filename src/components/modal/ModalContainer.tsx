import { Box } from '@mui/material';
import { ReactNode, useCallback } from 'react';

type Props = {
  children: ReactNode;
  visible?: boolean;
  onClose?: () => void;
};

export const ModalContainer = ({ children, visible, onClose }: Props) => {
  const handleClose = useCallback(() => onClose?.(), [onClose]);
  const handleClcik = ({ target }: any) => {
    console.log(target);
    if (target.id === 'mask') handleClose();
  };

  if (!visible) return null;
  return (
    <Box
      id="mask"
      onClick={handleClcik}
      sx={{
        position: 'fixed',
        zIndex: 50,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'gray'
      }}
    >
      {children}
    </Box>
  );
};
