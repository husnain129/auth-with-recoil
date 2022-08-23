/* eslint-disable no-unused-vars */
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { atom, useSetRecoilState } from 'recoil';

export type AuthCredetials = {
  email: string;
  password: string;
  name: string;
  role: string;
};

const AuthCredentials: AuthCredetials[] = [
  {
    email: 'mlhlk1212@gmail.com',
    password: '123456',
    name: 'Husnain',
    role: 'admin',
  },
  {
    email: 'test@gmail.com',
    password: 'test',
    name: 'Test',
    role: 'user',
  },
];

export const UserAtom = atom({
  key: 'User',
  default: {
    email: 'mlhlk1212@gmail.com',
    name: 'Husnain',
    role: 'admin',
  },
});

const LoginPage = () => {
  const setUser = useSetRecoilState(UserAtom);
  const router = useRouter();
  const [auth, setAuth] = useState({
    email: '',
    password: '',
  });
  const handleLogin = () => {
    const { email, password } = auth;
    const user = AuthCredentials.find(
      (e) => e.email === email && e.password === password
    );
    if (user && user?.email !== '' && user?.password !== '') {
      const passUserData = (({ password, ...o }) => o)(user);
      setUser(passUserData);
      setAuth({
        email: '',
        password: '',
      });
      localStorage.setItem('auth', JSON.stringify(passUserData));
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user');
      }
    }
  };

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [e.target.name, e.target.value];
    setAuth({
      ...auth,
      [name]: value,
    });
  };

  return (
    <Flex
      w="full"
      h="100vh"
      bg="blackAlpha.300"
      alignItems={'center'}
      justifyContent="center"
    >
      <VStack
        w="20em"
        justifyContent={'space-between'}
        h="17em"
        p="2em 2em 1.5em"
        bg="white"
        shadow={'sm'}
        borderRadius="md"
      >
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            value={auth['email']}
            onChange={handleInputs}
            type="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={auth['password']}
            onChange={handleInputs}
            type="password"
          />
        </FormControl>
        <Button onClick={handleLogin} w={'full'} colorScheme="green">
          Login
        </Button>
      </VStack>
    </Flex>
  );
};

export default LoginPage;
