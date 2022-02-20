import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  StackDivider,
  VStack,
  Box,
  useColorModeValue,
  ModalFooter,
  Flex,
  Text,
  Spacer,
  Icon,
  LightMode,
  Skeleton,
  Spinner,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import NumberFormat from 'react-number-format';
import {
  useDeleteExpenseMutation,
  useExpensesQuery,
} from '../generated/graphql';
import SquareButton from './SquareButton';

type ExpensesListModalProps = {
  budgetId: string;
  budgetName: string;
  isOpen: boolean;
  hide: () => void;
};

const ExpensesListModal: FC<ExpensesListModalProps> = ({
  budgetId,
  budgetName,
  isOpen,
  hide,
}) => {
  const dividerColor = useColorModeValue('gray.600', 'gray.400');
  const [deletingIds, setDeletingIds] = useState<Array<string>>([]);
  const [, deleteExpense] = useDeleteExpenseMutation();
  const [{ data }, getExpenses] = useExpensesQuery({
    variables: { budgetId },
    pause: true,
  });

  async function deleteButtonHandler(expenseId: string) {
    setDeletingIds((currIds) => [...currIds, expenseId]);
    await deleteExpense({ expenseId });
    setDeletingIds((currIds) => currIds.filter((id) => id !== expenseId));
  }

  useEffect(() => {
    if (isOpen) {
      getExpenses();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={hide} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{budgetName} Expenses</ModalHeader>
        <ModalCloseButton />

        <ModalBody mb="3">
          <VStack
            divider={<StackDivider borderColor={dividerColor} />}
            spacing="3"
            align="stretch"
          >
            {!data && (
              <>
                <Skeleton height="6" />
                <StackDivider my="3" />
                <Skeleton height="6" />
              </>
            )}
            {data?.expenses.expenses?.map((expense) => (
              <Flex key={expense.id} alignItems="center">
                <Text>{expense.name}</Text>
                <Spacer />
                <NumberFormat
                  value={expense.value}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                  decimalScale={2}
                />
                <Spacer maxW="3" />
                <LightMode>
                  <SquareButton
                    h="1.5em"
                    colorScheme="red"
                    onClick={() => deleteButtonHandler(expense.id)}
                    disabled={deletingIds.includes(expense.id)}
                  >
                    {deletingIds.includes(expense.id) ? (
                      <Spinner sx={{ '--spinner-size': '1rem' }} />
                    ) : (
                      <Icon boxSize="1em" as={MdDeleteForever} />
                    )}
                  </SquareButton>
                </LightMode>
              </Flex>
            ))}
            {data && !data.expenses.expenses?.length && (
              <Text textColor={dividerColor}>
                No expense associated with this budget.
              </Text>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExpensesListModal;
