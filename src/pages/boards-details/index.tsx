import { Button, Descriptions, Divider, Layout, Spin } from 'antd';
import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import LoadingPage from '../loading';
import { getBoardDetailsAsync, getBoardsColumnsAsync } from '../../store';
import { useAppDispatch, useAppSelector, useCookiesStorage } from '../../hooks';

import './index.scss';

const { Content } = Layout;

import { BoardColumns, ModalCreateColumn } from '../../components';
import { useTranslation } from 'react-i18next';

const BoardDetailsPage = () => {
  const { t } = useTranslation('');
  const { boardId = '' } = useParams();
  const dispatch = useAppDispatch();
  const { boardDetails, boardDetailsLoading, boardColumnsLoading } = useAppSelector(
    (state) => state.boards
  );
  const { cookies } = useCookiesStorage(['authToken']);

  useEffect(() => {
    getBoardData();
  }, []);

  const getBoardData = () => {
    const boardData = { token: cookies.authToken, boardId };
    dispatch(getBoardDetailsAsync(boardData));
    dispatch(getBoardsColumnsAsync(boardData));
  };

  if (!cookies.authToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <Content className="board-details">
      <div className="board-details__content">
        <div className="board-details__btns">
          <Button type="primary">
            <Link to="/boards">{t('goToBoardsPage')}</Link>
          </Button>
          <ModalCreateColumn boardId={boardId} />
        </div>

        <Divider />

        {!boardDetailsLoading ? (
          <>
            <Descriptions title={t('boardInfo')}>
              <Descriptions.Item label={t('title')}>
                {boardDetails?.title || 'Empty'}
              </Descriptions.Item>
              <Descriptions.Item label={t('description')}>
                {boardDetails?.description || 'Empty'}
              </Descriptions.Item>
            </Descriptions>

            <Divider />
            <div className="board-details__btn">
              <ModalCreateColumn boardId={boardId} />
            </div>

            {!boardColumnsLoading ? <BoardColumns boardId={boardId} /> : <Spin />}
          </>
        ) : (
          <LoadingPage />
        )}
      </div>
    </Content>
  );
};

export default BoardDetailsPage;
