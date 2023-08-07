import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './style.css';
import {
  strengthColor,
  strengthIndicator,
} from '../../../utils/password-strength';
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../../slice/api/userApiSlice';
import { useNavigate } from 'react-router-dom';

const UpdateProfilePage = () => {
  const [level, setLevel] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const [show, setShow] = useState(false);

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const { data: profileData } = useGetUserProfileQuery();

  const [updateUserProfile, { data, isLoading, isSuccess }] =
    useUpdateUserProfileMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (profileData) {
      setName(profileData?.userProfile?.name);
      setEmail(profileData?.userProfile?.email);
      setUserName(profileData?.userProfile?.username);
      setCity(profileData?.userProfile?.city);
    }

    if (isSuccess) {
      navigate(`/profile`);
      const message = data?.message;
      toast.success(message);
    }
  }, [data, isSuccess, navigate, profileData]);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      username,
      password,
      city,
    };
    updateUserProfile(data);
  };

  return (
    <>
      <div className="register-body">
        <div className="boxS">
          <span className="borderLineS"></span>
          <form onSubmit={submitHandler} autocomplete="new-password">
            <h2>Update</h2>
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
                  cursor: 'pointer',
                }}
                onClick={() => setShow(!show)}
              >
                {level?.label}
              </div>
            )}
            <div className="inputBoxS">
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <span>Lived in</span>
              <i></i>
            </div>

            <input
              type="submit"
              name="update"
              value="Update"
              {...(isLoading && { disabled: true })}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfilePage;
