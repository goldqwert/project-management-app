import { API_URL, HTTP_STATUS } from '../../constants';

class ColumnsService {
  async getColumns(token: string, boardId: string) {
    const response = await fetch(`${API_URL}boards/${boardId}/columns`, {
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

  async createColumn(token: string, { id, title }: IColumn) {
    const response = await fetch(`${API_URL}boards/${id}/columns`, {
      method: 'POST',
      body: JSON.stringify({ title }),
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

const columnsService = new ColumnsService();

export default columnsService;
