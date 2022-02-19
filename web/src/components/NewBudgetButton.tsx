import { Box, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';
const NewBudgetButton: FC = () => {
  const hoverColor = useColorModeValue('gray.300', 'gray.600');
  const activeColor = useColorModeValue('hsl(212, 20%, 80%)', 'gray.500');

  return (
    <Box
      as="button"
      w="100%"
      border="1px"
      borderColor="gray.500"
      borderRadius="3xl"
      fontSize="3xl"
      py="4"
      mb="3"
      transition="all 0.2s"
      _hover={{ bg: hoverColor }}
      _active={{
        bg: activeColor,
      }}
      _focus={{
        boxShadow: `0 0 1px 2px ${hoverColor}, 0 1px 1px rgba(0, 0, 0, .15)`,
      }}
    >
      +
    </Box>
  );
};

export default NewBudgetButton;
