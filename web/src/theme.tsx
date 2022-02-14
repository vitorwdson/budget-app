import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
