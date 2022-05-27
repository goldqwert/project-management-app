import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Layout, Menu, Form, Input, Button } from 'antd';
import Modal from '../Modal/Modal';
import { dispatchStore, RootState } from '../../types/types';
import { clearUserData } from '../../store/slices/logout-slice';
import getNewBoard from '../../store/actions/newBoard-actions';
import {
  createNewBoardTitle,
  createNewBoardDescription,
} from '../../store/slices/board-slice';

const { Header } = Layout;

const HeaderMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const { title, description } = useSelector((state: RootState) => state.board);
  const onChange = () => {};
  const signOutClick = () => {
    setShowModal(true);
  };
  const createBoardClick = () => {
    setShowNewBoardModal(true);
  };

  const logoutHandler = () => {
    dispatchStore(clearUserData());
    navigate('/');
  };
  const modalHandler = () => {
    setShowModal(false);
    setShowNewBoardModal(false);
  };
  const createBoardSubmit = () => {
    const boardData = {
      title,
      description,
    };
    dispatchStore(getNewBoard(boardData));
    setShowNewBoardModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal onConfirm={modalHandler}>
          <header className="header">
            <h2>Do You want to Sign Out?</h2>
          </header>
          <footer className="actions">
            <Button type="primary" onClick={logoutHandler}>
              Sign Out
            </Button>
            <Button type="primary" onClick={modalHandler}>
              Cancel
            </Button>
          </footer>
        </Modal>
      )}
      {showNewBoardModal && (
        <Modal onConfirm={modalHandler}>
          <header className="header">
            <h2>Create new board</h2>
          </header>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ remember: true }}
            onFinish={createBoardSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: 'Please input title of the board!' },
              ]}
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(createNewBoardTitle(e.target.value));
                }}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input description!' }]}
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(createNewBoardDescription(e.target.value));
                }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <footer className="actions">
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </footer>
            </Form.Item>
          </Form>
        </Modal>
      )}

      <Layout
        style={{ position: 'sticky', top: 0, zIndex: 1, marginBottom: '50px' }}
      >
        <Header style={{ zIndex: 1, width: '100%', background: 'white' }}>
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
