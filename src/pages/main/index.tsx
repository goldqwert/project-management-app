import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Layout, List } from 'antd';

import { boardsService } from '../../api';
import { useAuth, useCookiesStorage } from '../../hooks';

import './index.scss';

const { Content } = Layout;

const MainPage = () => {
  const { cookies } = useCookiesStorage(['authToken']);
  const [boards, setBoards] = useState<IBoard[]>([]);

  useAuth();

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    try {
      const boards = await boardsService.getBoards(cookies.authToken);
      setBoards(boards);
    } catch (error) {}
  };

  if (!cookies.authToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <Content className="main">
      <div className="main__content">
        <List
          bordered
          itemLayout="horizontal"
          dataSource={boards}
          renderItem={({ title, description }: IBoard) => (
            <List.Item actions={[<a key="list-loadmore-edit">view</a>]}>
              <List.Item.Meta
                title={<p className="main__text">{title}</p>}
                description={<p className="main__text">{description}</p>}
              />
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
};

export default MainPage;
