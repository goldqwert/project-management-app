import { Typography } from 'antd';

import { useAppSelector } from '../../hooks';

import { BoardColumnsProps } from './types';

import './index.scss';

import BoardTasks from '../board-tasks';

const { Title } = Typography;

const BoardColumns = ({ boardId }: BoardColumnsProps) => {
  const columns = useAppSelector((state) => state.boards.columns);

  return (
    <>
      {columns?.length > 0 ? (
        <div className="board-columns">
          {columns.map(({ title, id }: IColumn) => (
            <div key={id} className="board-columns__item">
              <div className="board-columns__item-header">
                <h3 className="board-columns__title">{title}</h3>
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
