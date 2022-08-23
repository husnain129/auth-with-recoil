import { Button, Flex, Text } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { UserAtom } from '../pages/auth/login';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useRecoilState(UserAtom);
  const logoutHandle = () => {
    localStorage.removeItem('auth');
    setUser({
      email: '',
      name: '',
      role: '',
    });
  };
  return (
    <Flex w="full" minH={'100vh'} alignItems="center" flexDir={'column'}>
      <Flex
        h="4em"
        w="full"
        px="2em"
        alignItems={'center'}
        justifyContent="space-between"
        bg="blackAlpha.300"
      >
        <Text fontWeight={'semibold'}>{user.name}</Text>
        <Button colorScheme={'red'} onClick={logoutHandle}>
          Logout
        </Button>
      </Flex>
      <Flex
        alignItems={'center'}
        justifyContent="center"
        w="full"
        minH={'96vh'}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
