import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

const SquareButton: FC<ButtonProps> = ({ p, sx, ...props }) => (
  <Button {...props} minW="0" p={p || '0'} sx={{ aspectRatio: '1/1', ...sx }} />
);

export default SquareButton;
