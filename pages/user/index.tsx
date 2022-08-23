import { Text } from '@chakra-ui/react';
import privateRoutes from '../../components/auth/private-routes';
import Layout from '../../layout';

const UserPage = () => {
  return (
    <Layout>
      <Text fontWeight={'semibold'}>User Dashboard</Text>
    </Layout>
  );
};

export default privateRoutes({
  Component: UserPage,
  options: { pathAfterFailure: '/auth/login', role: 'user' },
});
