import './style.css';
import { Link } from 'react-router-dom';

const Nav = () => {
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
      </div>
    </div>
  );
};

export default Nav;
