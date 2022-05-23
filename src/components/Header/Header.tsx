import React from 'react';
import { Link } from 'react-router-dom';
import { Switch, Layout, Menu } from 'antd';
const { Header } = Layout;

const HeaderMenu = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const signOutClick = () => {};
  const createBoardClick = () => {};

  return (

    <Layout >
      <Header style={{ position: 'sticky', zIndex: 1, width: '100%' }}>
        <Menu theme="light" mode="horizontal">
          <Menu.Item key="profile">
            <Link to="/edit">Edit profile</Link>
          </Menu.Item>
          <Menu.Item key="out" onClick={signOutClick}>
            Sign Out
          </Menu.Item>
          <Menu.Item key="board" onClick={createBoardClick}>
            Create new board
          </Menu.Item>
          <Menu.Item key="switch">
            <Switch defaultChecked onChange={onChange} />
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};
export default HeaderMenu;
