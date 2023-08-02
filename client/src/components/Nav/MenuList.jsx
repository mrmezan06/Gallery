import { Link } from 'react-router-dom';
import './menuList.css';

const MenuList = () => {
  return (
    <>
      <div class="menu-container">
        <Link to="/gallery" style={{ textDecoration: 'none' }}>
          <div class="list">
            <div class="rank">
              <span>
                <i class="fa fa-picture-o" aria-hidden="true"></i>
              </span>
            </div>
            <div class="creator">
              <h4>Gallery</h4>
            </div>
          </div>
        </Link>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <div class="list">
            <div class="rank">
              <span>
                <i class="fa fa-users" aria-hidden="true"></i>
              </span>
            </div>
            <div class="creator">
              <h4>About</h4>
            </div>
          </div>
        </Link>
        <Link to="/contact" style={{ textDecoration: 'none' }}>
          <div class="list">
            <div class="rank">
              <span>
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>
            <div class="creator">
              <h4>Contact Us</h4>
            </div>
          </div>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <div class="list">
            <div class="rank">
              <span>
                <i class="fa fa-sign-in" aria-hidden="true"></i>
              </span>
            </div>
            <div class="creator">
              <h4>Login</h4>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MenuList;
