import React from 'react';
import Button from '../Button';


const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="edit-button">
          <Button>Edit profile</Button>
        </div>
        <div className="out-button">
          <Button>Sign Out</Button>
        </div>
        <div className="board">
          <Button>Create new board</Button>
        </div>
        <div className="select-lang">
        </div>
      </div>
    </header>
  );
};
export default Header;
