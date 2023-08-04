import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useVerifyUserMutation } from '../../slice/api/authAPISlice';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './style.css';

const VerifyRegistrationPage = () => {
  const [token, setToken] = useState('');

  const [verifyUser, { data, isLoading, isSuccess }] = useVerifyUserMutation();

  const location = useLocation();

  const userId = location.search.split('=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      const message = data?.message;
      toast.success(message);
    }
  }, [data, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      token,
      userId,
    };
    console.log(data);
    verifyUser(data);
  };

  return (
    <>
      <div className="verify-body">
        <div className="boxV">
          <span className="borderLineS"></span>
          <form onSubmit={submitHandler} autocomplete="new-password">
            <h2>Verify</h2>
            <div className="inputBoxS">
              <input
                type="text"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                aria-autocomplete="none"
                required
              />
              <span>Code</span>
              <i></i>
            </div>
            <div className="linksS">
              <a href="/resend-code">Resend Verification Code</a>
              <a href="/login">Login</a>
            </div>
            <input
              type="submit"
              name="verify"
              value="Verify"
              {...(isLoading && { disabled: true })}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyRegistrationPage;
