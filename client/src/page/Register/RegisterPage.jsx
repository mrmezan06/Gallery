import './style.css';

const RegisterPage = () => {
  return (
    <>
      <div className="register-body">
        <div className="boxS">
          <span className="borderLineS"></span>
          <form>
            <h2>Register</h2>
            <div className="inputBoxS">
              <input type="text" name="" required="" />
              <span>Name</span>
              <i></i>
            </div>
            <div className="inputBoxS">
              <input type="email" name="" required="" />
              <span>Email</span>
              <i></i>
            </div>
            <div className="inputBoxS">
              <input type="text" name="" required="" />
              <span>Username</span>
              <i></i>
            </div>
            <div className="inputBoxS">
              <input type="password" name="" required="" />
              <span>Password</span>
              <i></i>
            </div>
            <div className="inputBoxS">
              <input type="password" name="" required="" />
              <span>Confirm Password</span>
              <i></i>
            </div>
            <div className="linksS">
              <a href="/reset-password">Forget Password?</a>
              <a href="/login">Login</a>
            </div>
            <input type="submit" name="" value="Register" />
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
