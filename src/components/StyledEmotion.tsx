import styled from '@emotion/styled';
import { FC } from 'react';

// interfaceでpropsの箇所のみ型指定
interface IButtonProps {
  backgroundColor: string;
}

/* 
  emotion/styled は 
  styled.button``で定義する(buttonの箇所は任意のタグ)
  (props) => props.backgroundColor とする必要がある
*/

const Button = styled.button<IButtonProps>`
  padding: 32px;
  background-color: ${(props) => props.backgroundColor};
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

const StyledEmotionButton: FC = () => {
  return <Button backgroundColor="green">This my button component.</Button>;
};

export default StyledEmotionButton;