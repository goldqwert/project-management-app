import { useEffect, MouseEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, Divider, Layout, List, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { boardsService } from '../../api';
import { useAppDispatch, useAppSelector, useAuth, useCookiesStorage } from '../../hooks';

import './index.scss';
import { getBoardsAsync, deleteBoard } from '../../store';
import { getMessageFromError, openNotification } from '../../helpers';

const { Content } = Layout;
const { confirm } = Modal;

const BoardsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);
  const { cookies } = useCookiesStorage(['authToken']);

  useAuth();

  useEffect(() => {
    dispatch(getBoardsAsync(cookies.authToken));
  }, []);

  const onOkDeleteBoard = async (boardId: string) => {
    try {
      await boardsService.deleteBoard(boardId, cookies.authToken);
      openNotification('success', 'Board succesfully deleted!');
      dispatch(deleteBoard(boardId));
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    }
  };

  const onDeleteBoard = (e: MouseEvent<HTMLSpanElement>, boardId: string) => {
    e.stopPropagation();
    confirm({
      title: 'Are you sure you want to delete the board?',
      icon: <ExclamationCircleOutlined />,
      content: 'The board will be deleted with all data',
      onOk: () => onOkDeleteBoard(boardId),
      onCancel: () => {},
    });
  };

  const onOpenBoard = (boardId: string) => navigate(`/boards/${boardId}`);

  if (!cookies.authToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <Content className="boards">
      <div className="boards__content">
        <div className="boards__welcome">
          <Button type="primary">
            <Link to="/">Go to welcome page</Link>
          </Button>
        </div>

        <Divider />

        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={boards}
          renderItem={({ id, title, description }: IBoard) => (
            <List.Item>
              <Card
                onClick={() => onOpenBoard(id)}
                hoverable
                title={title}
                actions={[<DeleteOutlined key="delete" onClick={(e) => onDeleteBoard(e, id)} />]}
              >
                <p className="boards__card-text">{description}</p>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
};

export default BoardsPage;
