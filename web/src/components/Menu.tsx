import {
  Flex,
  Center,
  Heading,
  Box,
  Spacer,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MdLogout, MdCreate, MdLogin } from 'react-icons/md';

interface MenuProps {
  userName?: string;
  loggedIn: boolean;
}

const Menu: FC<MenuProps> = ({ userName, loggedIn }) => {
  return (
    <Flex border="1px" borderColor="gray.500" borderRadius="3xl" p="4">
      <Center>
        <Heading
          size="lg"
          color="green.500"
          fontWeight="bold"
          fontStyle="italic"
        >
          $
        </Heading>
      </Center>
      <Box p="2">
        <Heading size="md" color="gray.900">
          Budget App
        </Heading>
      </Box>
      <Spacer />
      {loggedIn && (
        <>
          <Box p="2">
            <Heading size="md" color="gray.700">
              {userName}
            </Heading>
          </Box>
          <Box display="flex">
            <Button colorScheme="red" variant="link" minW="0">
              <Icon as={MdLogout} boxSize="1.5em" />
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default Menu;
