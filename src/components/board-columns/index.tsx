import { Button, Typography, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector, useCookiesStorage } from '../../hooks';

import { BoardColumnsProps } from './types';

import './index.scss';

import BoardTasks from '../board-tasks';
import { columnsService } from '../../api';
import { getMessageFromError, openNotification } from '../../helpers';
import { getBoardsColumnsAsync } from '../../store';
import BoardColumnTitle from '../board-column-title';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { confirm } = Modal;

const BoardColumns = ({ boardId }: BoardColumnsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { cookies } = useCookiesStorage(['authToken']);
  const columns = useAppSelector((state) => state.boards.columns);

  const deleteColumn = async (columnId: string) => {
    try {
      await columnsService.deleteColumn(cookies.authToken, boardId, columnId);
      openNotification('success', t('columnDeleted'));
      dispatch(getBoardsColumnsAsync({ token: cookies.authToken, boardId }));
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    }
  };

  const onDeleteColumn = (columnId: string) => {
    confirm({
      title: t('deleteColumn'),
      icon: <ExclamationCircleOutlined />,
      content: t('columnWillDelete'),
      onOk: () => deleteColumn(columnId),
      onCancel: () => {},
    });
  };

  return (
    <>
      {columns?.length > 0 ? (
        <div className="board-columns">
          {columns.map(({ title, id, order }: IColumn) => (
            <div key={id} className="board-columns__item">
              <div className="board-columns__item-header">
                <Button type="link" onClick={() => onDeleteColumn(id)}>
                  {t('columnDelete')}
                </Button>
                <BoardColumnTitle title={title} order={order} boardId={boardId} columnId={id} />
              </div>
              <BoardTasks columnId={id} boardId={boardId} />
            </div>
          ))}
        </div>
      ) : (
        <Title level={4}>No columns</Title>
      )}
    </>
  );
};

export default BoardColumns;
