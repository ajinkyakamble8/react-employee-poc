import React, { lazy, Suspense } from 'react';

const LazyEmployees = lazy(() => import('./Employees'));

const Employees = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyEmployees {...props} />
  </Suspense>
);

export default Employees;
