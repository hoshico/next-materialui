import { ChangeEvent, useCallback, useState } from 'react';
import { ModalContainer } from './ModalContainer';
import { Box } from '@mui/material';

type Props = {
  visible?: boolean;
  onClose?: () => void;
  onSelect: (result: string) => void;
};

export const Modal = ({ visible, onSelect, onClose }: Props) => {
  const [selectedItem, setSelectedItem] = useState('');
  const hancleClose = useCallback(() => onClose?.(), [onClose]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedItem(e.target.value);
  };
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <Box
        sx={{ width: 800, height: 450, bgcolor: 'black', overflowY: 'auto' }}
      >
        <input onChange={handleChange} />
      </Box>
    </ModalContainer>
  );
};
