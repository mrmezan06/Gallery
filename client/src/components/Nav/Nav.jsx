import './style.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuList from './MenuList';

const Nav = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  // width > 680px => menu = false

  // useEffect(() => {
  //   if (window.innerWidth > 680) {
  //     setMenu(false);
  //   }
  // }, []);

  return (
    <div className="nav-body">
      <div className="container-logo">
        <div className="logo">
          <h1>
            <Link to="/">
              <span>🎨</span>Art Gallery
            </Link>
          </h1>
        </div>
      </div>
      <div className="item">
        <div className="container-nav">
          <div className="list">
            <div className="rank">
              <span>➡️</span>
            </div>
            <div className="creator">
              <h4>Gallery</h4>
            </div>
          </div>
          <div className="list">
            <div className="rank">
              <span>➡️</span>
            </div>
            <div className="creator">
              <h4>About</h4>
            </div>
          </div>
          <div className="list">
            <div className="rank">
              <span>➡️</span>
            </div>
            <div className="creator">
              <h4>Contact Us</h4>
            </div>
          </div>
          <div className="list">
            <div className="rank">
              <span>➡️</span>
            </div>
            <div className="creator">
              <h4>Login</h4>
            </div>
          </div>
        </div>
        {/* Menu Icon */}

        {/* Todo: onClick menu popup a Menu List */}

        <h4 className={`menu`} onClick={handleMenu}>
          <i className="fa fa-bars"></i>
        </h4>

        {menu && <MenuList />}
      </div>
    </div>
  );
};

export default Nav;
