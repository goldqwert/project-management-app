import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Switch, Layout, Menu } from 'antd';
import Modal from '../Modal/Modal';
import { removeCookie } from 'typescript-cookie';
import { dispatchStore } from '../../types/types';
import {clearUserData} from "../../store/slices/logout-slice";
const { Header } = Layout;

const HeaderMenu = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const onChange = () => {

  };
  const signOutClick = () => {
    setShowModal(true);
  };
  const createBoardClick = () => {};
  const logoutHandler = () => {
    dispatchStore(clearUserData());
    removeCookie("id");
    removeCookie("jwt");
    navigate("/");
  }
  const modalHandler = () => {
    setShowModal(false);
  }
  return (
    <>
    {showModal && (<Modal
      title={"Do You want to Sign Out?"}
      onConfirm={modalHandler}
      onSubmit={logoutHandler}
      onCancel={modalHandler}/>)}
    <Layout >
      <Header style={{ position: 'sticky', zIndex: 1, width: '100%', background:'white'}}>
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
      </>
  );
};
export default HeaderMenu;
