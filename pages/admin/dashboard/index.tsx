import privateRoutes from '../../../components/auth/private-routes';

const AdminDashboardPage = () => {
  return <div>AdminDashboardPage</div>;
};

export default privateRoutes({
  Component: AdminDashboardPage,
  options: { pathAfterFailure: '/admin/auth/login' },
});
