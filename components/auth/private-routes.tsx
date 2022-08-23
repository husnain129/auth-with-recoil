import { Flex, Spinner } from '@chakra-ui/react';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { UserAtom } from '../../pages/auth/login';

const privateRoutes = ({
  Component,
  options: { pathAfterFailure, role },
}: {
  Component: React.ComponentType;
  options: { pathAfterFailure: string; role: 'admin' | 'user' };
}) => {
  const PrivateRoutes = () => {
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = useRecoilState(UserAtom);
    console.log('user', user);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setUser((pre) => ({
          ...pre,
          user: JSON.parse(localStorage.getItem('auth') as string),
        }));
      }
      setUser(user);
      if (user && Object.keys(user).length > 0 && user.role === role) {
        setLoading(false);
      } else {
        Router.push(pathAfterFailure);
      }
    }, [setUser, user]);

    return !loading ? (
      <Component />
    ) : (
      <Flex
        w="full"
        bg="blackAlpha.300"
        h="100vh"
        alignItems={'center'}
        justifyContent="center"
      >
        <Spinner />
      </Flex>
    );
  };
  return PrivateRoutes;
};

export default privateRoutes;
