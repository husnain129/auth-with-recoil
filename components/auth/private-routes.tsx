import Router from 'next/router';
import React from 'react';

type MyState = {
  isAuthenticated: boolean;
};

const privateRoutes = ({
  Component,
  options: { pathAfterFailure },
}: {
  Component: React.ComponentType;
  options: { pathAfterFailure: string };
}) => {
  class PrivateRoutes extends React.Component {
    state: MyState = {
      isAuthenticated: false,
    };

    componentDidMount(): void {
      if (!this.state.isAuthenticated) {
        Router.push(pathAfterFailure);
      }
    }
    render(): React.ReactNode {
      return this.state.isAuthenticated ? <Component /> : null;
    }
  }
  return PrivateRoutes;
};

export default privateRoutes;
