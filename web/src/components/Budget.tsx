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

const colors = ['green', 'yellow', 'orange'];
const shades = ['400', '500', '600', '700', '800'];

const Budget: FC<BudgetProps> = ({ name, maxValue, currentValue }) => {
  const colorSize = maxValue / colors.length;
  const colorIndex = Math.min(
    Math.floor(currentValue / colorSize),
    colors.length - 1,
  );

  const shadeSize = colorSize / shades.length;
  const shadeIndex = Math.min(
    Math.floor((currentValue % colorSize) / shadeSize),
    shades.length - 1,
  );

  let colorScheme = colors[colorIndex];
  let colorShade = shades[shadeIndex];

  if (currentValue >= maxValue) {
    colorScheme = 'red';
    colorShade = currentValue > maxValue ? '800' : '600';
  }

  const color = `${colorScheme}.${colorShade}`;

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
          '& > div': {
            backgroundColor: color,
          },
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
