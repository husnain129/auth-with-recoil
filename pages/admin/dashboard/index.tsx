import { Text } from '@chakra-ui/react';
import privateRoutes from '../../../components/auth/private-routes';
import Layout from '../../../layout';

const AdminDashboardPage = () => {
  return (
    <Layout>
      <Text fontWeight={'semibold'}>Admin Dashboard</Text>
    </Layout>
  );
};

export default privateRoutes({
  Component: AdminDashboardPage,
  options: { pathAfterFailure: '/auth/login', role: 'admin' },
});
