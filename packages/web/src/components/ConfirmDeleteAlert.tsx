import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';

type ConfirmDeleteAlertProps = {
  isOpen: boolean;
  onDelete: () => Promise<void>;
  hide: () => void;
};

const ConfirmDeleteAlert: FC<ConfirmDeleteAlertProps> = ({
  isOpen,
  hide,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelRef = useRef(null);

  async function deleteButtonHandler() {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
    hide();
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
            <Button ref={cancelRef} onClick={hide} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={deleteButtonHandler}
              ml={3}
              leftIcon={isDeleting ? <Spinner /> : undefined}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDeleteAlert;
