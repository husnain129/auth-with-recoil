import { Flex, Spinner } from '@chakra-ui/react';
import Router from 'next/router';
import React from 'react';
import { AuthCredetials } from '../../pages/auth/login';

type User = Omit<AuthCredetials, 'password'>;

type MyState = {
  loading: boolean;
  user: User;
};

const privateRoutes = ({
  Component,
  options: { pathAfterFailure, role },
}: {
  Component: React.ComponentType;
  options: { pathAfterFailure: string; role: 'admin' | 'user' };
}) => {
  class PrivateRoutes extends React.Component {
    state: MyState = {
      loading: true,
      user: {} as User,
    };

    componentDidMount(): void {
      if (typeof window === 'undefined') return;
      const user = JSON.parse(localStorage.getItem('auth') as string);
      this.setState((pre) => ({
        ...pre,
        user,
      }));
      this.setState({ loading: true });
      if (user && Object.keys(user).length > 0 && user.role === role) {
        this.setState({ loading: false });
      } else {
        Router.push(pathAfterFailure);
      }
    }
    render(): React.ReactNode {
      return !this.state.loading ? (
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
    }
  }
  return PrivateRoutes;
};

export default privateRoutes;
