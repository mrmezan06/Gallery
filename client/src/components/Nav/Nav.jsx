import './style.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuList from './MenuList';

const Nav = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

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
          <Link to="/gallery" style={{ textDecoration: 'none' }}>
            <div className="list">
              <div className="rank">
                <span>
                  <i class="fa fa-picture-o" aria-hidden="true"></i>
                </span>
              </div>
              <div className="creator">
                <h4>Gallery</h4>
              </div>
            </div>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <div className="list">
              <div className="rank">
                <span>
                  <i class="fa fa-users" aria-hidden="true"></i>
                </span>
              </div>
              <div className="creator">
                <h4>About</h4>
              </div>
            </div>
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <div className="list">
              <div className="rank">
                <span>
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div className="creator">
                <h4>Contact Us</h4>
              </div>
            </div>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <div className="list">
              <div className="rank">
                <span>
                  <i class="fa fa-sign-in" aria-hidden="true"></i>
                </span>
              </div>
              <div className="creator">
                <h4>Login</h4>
              </div>
            </div>
          </Link>
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
