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
}

const tasksService = new TasksService();

export default tasksService;
