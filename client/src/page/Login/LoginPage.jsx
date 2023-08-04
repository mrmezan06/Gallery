import './style.css';
import { useLoginUserMutation } from '../../slice/api/authAPISlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../slice/authSlice';

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const [loginUser, { data, isLoading, isSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/`);
    }
  }, [data, isSuccess, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };
    try {
      const userData = await loginUser(data);
      // console.log(userData);
      if (userData?.data?.success) {
        dispatch(login(userData?.data?.user));
        toast.success(userData?.data?.message);
      } else {
        toast.error(userData?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message);
    }
  };

  return (
    <>
      <div className="login-body">
        <div className="box">
          <span className="borderLine"></span>
          <form autoComplete="off" onSubmit={submitHandler}>
            <h2>Login</h2>
            <div className="inputBox">
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
            <div className="inputBox">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <span>Password</span>
              <i></i>
            </div>
            <div className="links">
              <a href="/reset-password">Forget Password?</a>
              <a href="/register">Register</a>
            </div>
            <input
              type="submit"
              name=""
              value="Login"
              {...(isLoading && { disabled: true })}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
