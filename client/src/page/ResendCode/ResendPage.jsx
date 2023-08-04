import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useResendVerifyEmailMutation } from '../../slice/api/authAPISlice';

import { useNavigate } from 'react-router-dom';

const ResendPage = () => {
  const [email, setEmail] = useState('');

  const [resendVerifyEmail, { data, isLoading, isSuccess }] =
    useResendVerifyEmailMutation();

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
      email,
    };

    resendVerifyEmail(data);
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
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-autocomplete="none"
                required
              />
              <span>Email</span>
              <i></i>
            </div>
            <div className="linksS">
              <a href="/register">Register</a>
              <a href="/login">Login</a>
            </div>
            <input
              type="submit"
              name="send"
              value="Send"
              {...(isLoading && { disabled: true })}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResendPage;
