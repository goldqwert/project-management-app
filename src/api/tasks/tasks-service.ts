import { API_URL, HTTP_STATUS } from '../../constants';

class TasksService {
  async getAllTasks(token: string, boardId: string, columnId: string) {
    const response = await fetch(`${API_URL}boards/${boardId}/columns/${columnId}/tasks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.status === HTTP_STATUS.SUCCESS) {
      return data;
    }

    throw new Error(data.message);
  }

  async createTask(
    token: string,
    userId: string,
    { boardId, columnId, title, description }: ICreateTask
  ) {
    const response = await fetch(`${API_URL}boards/${boardId}/columns/${columnId}/tasks`, {
      method: 'POST',
      body: JSON.stringify({ userId, title, description }),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.status === HTTP_STATUS.CREATED) {
      return data;
    }

    throw new Error(data.message);
  }

  async editTask(
    token: string,
    userId: string,
    boardId: string,
    columnId: string,
    taskId: string,
    title: string,
    description: string,
    order: number
  ) {
    const response = await fetch(
      `${API_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          title,
          order,
          description,
          userId,
          boardId,
          columnId,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (response.status === HTTP_STATUS.SUCCESS) {
      return data;
    }

    throw new Error(data.message);
  }

  async deleteTask(token: string, boardId: string, columnId: string, taskId: string) {
    const response = await fetch(
      `${API_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    if (response.status === HTTP_STATUS.NO_CONTENT) {
      return;
    }

    const data = await response.json();

    throw new Error(data.message);
  }
}

const tasksService = new TasksService();

export default tasksService;
