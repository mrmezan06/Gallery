import './menuList.css';

const MenuList = () => {
  return (
    <>
      <div class="menu-container">
        <div class="list">
          <div class="rank">
            <span>➡️</span>
          </div>
          <div class="creator">
            <h4>Gallery</h4>
          </div>
        </div>
        <div class="list">
          <div class="rank">
            <span>➡️</span>
          </div>
          <div class="creator">
            <h4>About</h4>
          </div>
        </div>
        <div class="list">
          <div class="rank">
            <span>➡️</span>
          </div>
          <div class="creator">
            <h4>Contact Us</h4>
          </div>
        </div>
        <div class="list">
          <div class="rank">
            <span>➡️</span>
          </div>
          <div class="creator">
            <h4>Login</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuList;
