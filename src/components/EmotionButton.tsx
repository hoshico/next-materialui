/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC } from 'react';

// styleをcss({})の定義
const buttonStyle = css({
  padding: '32px',
  backgroundColor: 'hotpink',
  fontSize: '24px',
  borderRadius: '4px',
  ':hover': {
    color: 'white',
  },
});

// divのインラインのcssで定義したbuttonStyleを読む
const EmotionButton: FC = () => {
  return <div css={buttonStyle}>Hover to change color.</div>;
};

export default EmotionButton;