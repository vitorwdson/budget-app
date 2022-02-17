import {
  Box,
  Flex,
  Heading,
  Icon,
  Progress,
  Spacer,
  useBoolean,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MdAddCircle, MdDeleteForever, MdReorder } from 'react-icons/md';
import { useDeleteBudgetMutation } from '../generated/graphql';
import ConfirmAlertBox from './ConfirmDeleteAlert';
import NewExpenseModal from './NewExpenseModal';
import SquareButton from './SquareButton';

interface BudgetProps {
  budgetId: string;
  name: string;
  maxValue: number;
  currentValue: number;
}

function getBudgetColor(maxValue: number, currentValue: number) {
  const colors = ['green', 'yellow', 'orange'];
  const shades = ['400', '500', '600', '700', '800'];

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
  return { colorScheme, colorShade, color };
}

const Budget: FC<BudgetProps> = ({
  budgetId,
  name,
  maxValue,
  currentValue,
}) => {
  const [, deleteBudget] = useDeleteBudgetMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useBoolean(false);
  const [showNewExpenseModal, setShowNewExpenseModal] = useBoolean(false);

  const { colorScheme, color } = getBudgetColor(maxValue, currentValue);
  const value = Math.max((currentValue / maxValue) * 100, 1);

  async function deleteHandler() {
    await deleteBudget({
      budgetId,
    });
  }

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
        sx={{
          backgroundColor: `${colorScheme}.100`,
          '& > div': {
            backgroundColor: color,
          },
        }}
      />
      <Flex mt="3" gap="3" justifyContent="flex-end">
        <SquareButton colorScheme="red" onClick={setShowDeleteConfirm.on}>
          <Icon boxSize="1.5em" as={MdDeleteForever} />
        </SquareButton>
        <SquareButton colorScheme="teal">
          <Icon boxSize="1.5em" as={MdReorder} />
        </SquareButton>
        <SquareButton colorScheme="green" onClick={setShowNewExpenseModal.on}>
          <Icon boxSize="1.5em" as={MdAddCircle} />
        </SquareButton>
      </Flex>

      <ConfirmAlertBox
        isOpen={showDeleteConfirm}
        hide={setShowDeleteConfirm.off}
        onDelete={deleteHandler}
      />

      <NewExpenseModal
        budgetId={budgetId}
        isOpen={showNewExpenseModal}
        hide={setShowNewExpenseModal.off}
      />
    </Box>
  );
};

export default Budget;
