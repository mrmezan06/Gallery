import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div sx={{ display: 'flex' }}>
      <div className="main" sx={{ flexGrow: '1' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
