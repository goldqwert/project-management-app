import { useEffect, useState } from 'react';
import { Button, Card, Spin } from 'antd';

import { useCookiesStorage } from '../../hooks';

import { BoardTasksProps, BoardColumnsTaskCreate } from './types';

import './index.scss';

import { tasksService } from '../../api';
import ModalCreateTitleAndDescription from '../modal-create-title-and-description';
import { getMessageFromError, openNotification } from '../../helpers';

const BoardTasks = ({ boardId, columnId }: BoardTasksProps) => {
  const { cookies } = useCookiesStorage(['authToken']);
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setIsLoadingTasks(true);
    try {
      const tasks = await tasksService.getAllTasks(cookies.authToken, boardId, columnId);
      setTasks(tasks);
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const onCreateTask = async (columnId: string, values: unknown) => {
    const { title, description } = values as BoardColumnsTaskCreate;
    try {
      await tasksService.createTask(cookies.authToken, cookies.authUserId, {
        boardId,
        columnId,
        title,
        description,
      });
      await getTasks();
      openNotification('success', 'Task succesfully created!');
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    }
  };

  return (
    <>
      <ModalCreateTitleAndDescription
        title="New task"
        buttonText="Create task"
        buttonType="primary"
        onCreate={(values: unknown) => onCreateTask(columnId, values)}
      />
      <div className="board-tasks">
        <div className="board-tasks__items">
          {isLoadingTasks ? (
            <Spin size="large" />
          ) : (
            <>
              {tasks?.map(({ id, title, description }) => (
                <Card
                  key={id}
                  size="small"
                  type="inner"
                  title={title}
                  extra={<Button type="link">Delete</Button>}
                >
                  <p className="board-tasks__description">{description}</p>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BoardTasks;
