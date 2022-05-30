import { useEffect, useState } from 'react';
import { Button, Card, Spin, Modal, Form, Input, Descriptions } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useCookiesStorage } from '../../hooks';

import { BoardTasksProps, BoardColumnsTaskCreate, EditTask } from './types';

import './index.scss';

import { tasksService } from '../../api';
import ModalCreateTitleAndDescription from '../modal-create-title-and-description';
import { getMessageFromError, openNotification } from '../../helpers';
import { useTranslation } from 'react-i18next';

const { confirm } = Modal;

const BoardTasks = ({ boardId, columnId }: BoardTasksProps) => {
  const { t } = useTranslation();
  const { cookies } = useCookiesStorage(['authToken']);

  const [visibleTaskModal, setVisibleTaskModal] = useState(false);

  const [isEditTask, setIsEditTask] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [currentTask, setCurrentTask] = useState<EditTask>();

  const [form] = Form.useForm();

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
      openNotification('success', t('taskCreated'));
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    }
  };

  const onOpenTask = (id: string, title: string, description: string, order: number) => {
    setVisibleTaskModal(true);
    setCurrentTask(() => {
      return { id, title, description, order };
    });
  };

  const onOkEditTaskModal = async () => {
    const values = await form.validateFields();
    setIsEditLoading(true);
    await onEditTask(values);
  };

  const onEditTask = async (values: unknown) => {
    const { title, description } = values as EditTask;
    try {
      await tasksService.editTask(
        cookies.authToken,
        cookies.authUserId,
        boardId,
        columnId,
        currentTask?.id || '',
        title,
        description,
        currentTask?.order || 1
      );
      openNotification('success', t('taskEdited'));
      await getTasks();
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    } finally {
      form.resetFields();
      setVisibleTaskModal(false);
      setIsEditLoading(false);
      setIsEditTask(false);
    }
  };

  const onCancelEditTaskModal = () => {
    form.resetFields();
    setIsEditTask(false);
    setVisibleTaskModal(false);
  };

  const editTask = () => setIsEditTask(true);

  const backToViewTask = () => setIsEditTask(false);

  const deleteTask = async (taskId: string) => {
    try {
      await tasksService.deleteTask(cookies.authToken, boardId, columnId, taskId);
      openNotification('success', t('taskDeleted'));
      await getTasks();
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    }
  };

  const onDeleteTask = (taskId: string) => {
    confirm({
      title: t('deleteTask'),
      icon: <ExclamationCircleOutlined />,
      content: t('taskWillDelete'),
      onOk: () => deleteTask(taskId),
      onCancel: () => {},
    });
  };

  return (
    <>
      <ModalCreateTitleAndDescription
        title={t('newTask')}
        buttonText={t('createTask')}
        buttonType="primary"
        onCreate={(values: unknown) => onCreateTask(columnId, values)}
      />
      <Modal
        title={t('taskInfoAndEditing')}
        visible={visibleTaskModal}
        onCancel={onCancelEditTaskModal}
        footer={[
          <Button key="cancel" onClick={onCancelEditTaskModal}>
            {t('cancel')}
          </Button>,
          <Button key="submit" type="primary" loading={isEditLoading} onClick={onOkEditTaskModal}>
            {t('submit')}
          </Button>,
        ]}
      >
        {isEditTask ? (
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{ modifier: 'public' }}
          >
            <Form.Item
              name="title"
              label={t('newTitle')}
              rules={[
                {
                  required: true,
                  message: t('titleRequiredFrom3To30'),
                  whitespace: true,
                  min: 3,
                  max: 30,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label={t('newDescription')}
              rules={[
                {
                  required: true,
                  message: t('descriptionRequiredFrom3To30'),
                  whitespace: true,
                  min: 3,
                  max: 30,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" onClick={backToViewTask}>
              {t('backToView')}
            </Button>
          </Form>
        ) : (
          <>
            <Descriptions layout="vertical">
              <Descriptions.Item label={t('title')}>{currentTask?.title}</Descriptions.Item>
              <Descriptions.Item label={t('description')}>
                {currentTask?.description}
              </Descriptions.Item>
              <Descriptions.Item label="System id">{currentTask?.id}</Descriptions.Item>
            </Descriptions>
            <Button type="primary" onClick={editTask}>
              {t('editTask')}
            </Button>
          </>
        )}
      </Modal>
      <div className="board-tasks">
        <div className="board-tasks__items">
          {isLoadingTasks ? (
            <Spin size="large" />
          ) : (
            <>
              {tasks?.map(({ id, title, description, order }) => (
                <Card
                  key={id}
                  size="small"
                  type="inner"
                  title={title}
                  extra={
                    <Button type="link" onClick={() => onDeleteTask(id)}>
                      {t('delete')}
                    </Button>
                  }
                >
                  <p className="board-tasks__description">{description}</p>
                  <Button type="link" onClick={() => onOpenTask(id, title, description, order)}>
                    {t('view')}
                  </Button>
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
