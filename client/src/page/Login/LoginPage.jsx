import './style.css';

const LoginPage = () => {
  return (
    <>
      <div className="login-body">
        <div className="box">
          <span className="borderLine"></span>
          <form action="#">
            <h2>Login</h2>
            <div className="inputBox">
              <input type="text" name="" required="" />
              <span>Username</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input type="password" name="" required="" />
              <span>Password</span>
              <i></i>
            </div>
            <div className="links">
              <a href="/reset-password">Forget Password?</a>
              <a href="/register">Register</a>
            </div>
            <input type="submit" name="" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
