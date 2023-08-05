import { Link, useNavigate } from 'react-router-dom';
import './menuList.css';
import { useSelector, useDispatch } from 'react-redux';
import { isExpired } from 'react-jwt';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { logout } from '../../slice/authSlice';
import { useLogoutUserMutation } from '../../slice/api/authApiSlice.js';

const MenuList = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // username first letter capitalize
  const username = user?.username?.split('')?.map((letter, index) => {
    if (index === 0) {
      return letter.toUpperCase();
    } else {
      return letter;
    }
  });

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      const isTokenExpired = isExpired(user?.accessToken);
      if (isTokenExpired) {
        dispatch(logout());
        navigate('/login');
        toast.warning('Your session has expired, login again');
      }
    }
  }, [user, dispatch, navigate, isSuccess, data]);

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
        {!user && (
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
        )}
        {user && (
          <>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <div className="list">
                <div className="rank">
                  <span>
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="creator">
                  <h4>{username}</h4>
                </div>
              </div>
            </Link>
            <Link
              to="!#"
              style={{ textDecoration: 'none' }}
              onClick={handleLogout}
            >
              <div className="list">
                <div className="rank">
                  <span>
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="creator">
                  <h4>Logout</h4>
                </div>
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default MenuList;
