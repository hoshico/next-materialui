import { ChangeEvent, useCallback, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

type Props = {
  visible?: boolean;
  onClose: () => void;
  onSelect: (result: string) => void;
};

export const Modal = ({ visible, onSelect, onClose }: Props) => {
  const [selectedItem, setSelectedItem] = useState('');
  const hancleClose = useCallback(() => onClose(), [onClose]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedItem(e.target.value);
  };
  if (!visible) return null;
  return (
    <Box
      sx={{
        width: 800,
        height: 450,
        bgcolor: 'gray',
        position: 'fixed',
        zIndex: 50,
        alignItems: 'center',
        margin: 'auto',
        justifyContent: 'center',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'lightGray'
      }}
    >
      <Typography>モーダル</Typography>
      <Button onClick={hancleClose}>選択</Button>
    </Box>
  );
};
