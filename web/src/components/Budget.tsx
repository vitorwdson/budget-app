import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Progress,
  Spacer,
} from '@chakra-ui/react';
import { FC } from 'react';

interface BudgetProps {
  name: string;
  maxValue: number;
  currentValue: number;
}

const colors = ['green', 'yellow', 'orange', 'red'];

const Budget: FC<BudgetProps> = ({ name, maxValue, currentValue }) => {
  const colorSize = maxValue / (colors.length - 1);
  const colorIndex = Math.min(
    Math.floor(currentValue / colorSize),
    colors.length - 1,
  );

  const colorScheme = colors[colorIndex];
  const color = `${colorScheme}.500`;

  const value = Math.max((currentValue / maxValue) * 100, 1);

  return (
    <Box
      w="100%"
      border="1px"
      borderColor="gray.500"
      borderRadius="3xl"
      padding="4"
      mb="3"
    >
      <Flex alignItems="center">
        <Heading fontSize="lg">{name}</Heading>
        <Spacer />
        <Heading fontSize="md" color={color}>
          ${currentValue} / ${maxValue}
        </Heading>
      </Flex>
      <Progress
        value={value}
        size="lg"
        mt="3"
        borderRadius="lg"
        colorScheme={colorScheme}
        sx={{
          backgroundColor: `${colorScheme}.100`,
        }}
      />
      <ButtonGroup
        mt="3"
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Button colorScheme="teal">View Expenses</Button>
        <Button colorScheme="green">Add Expense</Button>
      </ButtonGroup>
    </Box>
  );
};

export default Budget;
