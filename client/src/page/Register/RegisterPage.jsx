import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './style.css';
import {
  strengthColor,
  strengthIndicator,
} from '../../utils/password-strength';
import { useRegisterUserMutation } from '../../slice/api/authApiSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [level, setLevel] = useState({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const [registerUser, { data, isLoading, isSuccess }] =
    useRegisterUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/verify?userId=${data?._id}`);
      const message = data?.message;
      toast.success(message);
    }
  }, [data, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      username,
      password,
    };
    registerUser(data);
  };

  return (
    <>
      <div className="register-body">
        <div className="boxS">
          <span className="borderLineS"></span>
          <form onSubmit={submitHandler} autocomplete="new-password">
            <h2>Register</h2>
            <div className="inputBoxS">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-autocomplete="none"
                required
              />
              <span>Name</span>
              <i></i>
            </div>
            <div className="inputBoxS">
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span>Email</span>
              <i></i>
            </div>
            <div className="inputBoxS">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <span>Username</span>
              <i></i>
            </div>
            <div className="inputBoxS">
              <input
                type={show ? 'text' : 'password'}
                name="password"
                autocomplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  changePassword(e.target.value);
                }}
                required
              />

              <span>Password</span>
              <i></i>
            </div>
            {password && (
              <div
                style={{
                  height: '30px',
                  textAlign: 'center',
                  width: '100%',
                  marginTop: '5px',
                  backgroundColor: level?.color,
                  color: 'white',
                }}
                onClick={() => setShow(!show)}
              >
                {level?.label}
              </div>
            )}
            <div className="inputBoxS">
              <input
                type={show ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                autocomplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span>Confirm Password</span>
              <i></i>
            </div>
            {password && confirmPassword && (
              <div
                className="match-password"
                style={{
                  height: '30px',
                  width: '100%',
                  marginTop: '5px',
                  backgroundColor:
                    password === confirmPassword ? 'green' : 'red',
                  color: 'white',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setShow(!show)}
              >
                {password === confirmPassword
                  ? 'Password Matched'
                  : 'Password Do Not Matched'}
              </div>
            )}
            <div className="linksS">
              <a href="/reset-password">Forget Password?</a>
              <a href="/login">Login</a>
            </div>
            <input
              type="submit"
              name="register"
              value="Register"
              {...(isLoading && { disabled: true })}
              {...(password !== confirmPassword && { disabled: true })}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
