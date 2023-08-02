import './style.css';

const Footer = () => {
  return (
    <>
      <div className="main-footer">
        <div className="container-footer">
          <div className="row">
            <div className="col-footer">
              <div className="text-copy">Terms And Conditions | Privacy</div>
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
