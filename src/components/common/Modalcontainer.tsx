import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  visible?: boolean;
  onClose?(): void;
}

const Modalcontainer: FC<Props> = (props) => {
  const { children, visible } = props;
  if (!visible) return null;
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: '50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </Box>
  );
};

export default Modalcontainer;
