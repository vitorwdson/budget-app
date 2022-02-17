import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';

type ConfirmDeleteAlertProps = {
  isOpen: boolean;
  onDelete: () => void;
  hide: () => void;
};

const ConfirmDeleteAlert: FC<ConfirmDeleteAlertProps> = ({
  isOpen,
  hide,
  onDelete,
}) => {
  const cancelRef = useRef(null);

  function deleteButtonHandler() {
    hide();
    onDelete();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={hide}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Budget
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={hide}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deleteButtonHandler} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDeleteAlert;
