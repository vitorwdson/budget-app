import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { useRef, RefObject, FC } from 'react';

interface ErrorDialogProps {
  display: boolean;
  hide: () => void;
  message: string;
}

const ErrorDialog: FC<ErrorDialogProps> = ({ display, hide, message }) => {
  const modalCloseButtonRef = useRef(null);

  return (
    <AlertDialog
      isOpen={display}
      leastDestructiveRef={modalCloseButtonRef}
      onClose={hide}
      colorScheme="red"
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent alignSelf="center">
          <AlertDialogHeader
            fontSize="3xl"
            fontWeight="bold"
            textAlign="center"
          >
            Error
          </AlertDialogHeader>

          <AlertDialogBody textAlign="center">{message}</AlertDialogBody>

          <AlertDialogFooter justifyContent="center">
            <Button ref={modalCloseButtonRef} colorScheme="teal" onClick={hide}>
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ErrorDialog;
