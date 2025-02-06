import React from 'react';
import { Outlet } from 'umi';

const BlankLayout: React.FC = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default BlankLayout;
