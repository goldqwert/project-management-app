import { API_URL, HTTP_STATUS } from '../../constants';

class BoardsService {
  boardsUrl = `${API_URL}boards`;

  async createBoard(token: string, { title, description }: IBoard) {
    const response = await fetch(`${this.boardsUrl}`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
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

  async getBoards(token: string) {
    const response = await fetch(`${this.boardsUrl}`, {
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
}

const boardsService = new BoardsService();

export default boardsService;
