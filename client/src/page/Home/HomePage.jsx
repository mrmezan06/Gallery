import './style.css';

const HomePage = () => {
  return (
    <>
      <section className="body">
        <div className="container">
          <div className="card">
            <div className="content">
              <div className="imgbx">
                <img
                  src="./team/team1.jpg"
                  alt="Team 1"
                  width="320px"
                  height="320px"
                />
              </div>
              <div className="contentbx">
                <h3>
                  Maximalius M.
                  <br />
                  <span>Creative Designer</span>
                </h3>
              </div>
            </div>
            <ul className="sci">
              <li style={{ '--i': '1' }}>
                <a href="!#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': '2' }}>
                <a href="!#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': '3' }}>
                <a href="!#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="card">
            <div className="content">
              <div className="imgbx">
                <img
                  src="./team/team2.jpg"
                  alt="Team 2"
                  width="320px"
                  height="320px"
                />
              </div>
              <div className="contentbx">
                <h3>
                  Maximalius M.
                  <br />
                  <span>Creative Designer</span>
                </h3>
              </div>
            </div>
            <ul className="sci">
              <li style={{ '--i': '1' }}>
                <a href="!#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': '2' }}>
                <a href="!#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': '3' }}>
                <a href="!#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="card">
            <div className="content">
              <div className="imgbx">
                <img
                  src="./team/team3.jpg"
                  alt="Team 3"
                  width="320px"
                  height="320px"
                />
              </div>
              <div className="contentbx">
                <h3>
                  Maximalius M.
                  <br />
                  <span>Creative Designer</span>
                </h3>
              </div>
            </div>
            <ul className="sci">
              <li style={{ '--i': '1' }}>
                <a href="!#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': '2' }}>
                <a href="!#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': '3' }}>
                <a href="!#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
