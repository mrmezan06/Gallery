import './style.css';

const Footer = () => {
  return (
    <>
      <div className="main-footer">
        <div className="container-footer">
          <div className="row">
            <div className="col">
              <h2>Address</h2>
              <div className="list-unstyled">
                <li>123-456-7890</li>
                <li>Los Angeles, CA</li>
                <li>123 Street South North</li>
              </div>
            </div>
            <div className="vl"></div>
            <div className="col">
              <h2>Gallery</h2>
              <div className="list-unstyled">
                <li>Gallery 1</li>
                <li>Gallery 2</li>
                <li>Gallery 3</li>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-footer">
              <div className="text-copy">Terms Of Service | Privacy</div>
              <p className="copyright">
                &copy;{new Date().getFullYear() - 1}-{new Date().getFullYear()}
                {' | '}
                All rights reserved | Art Gallery
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
