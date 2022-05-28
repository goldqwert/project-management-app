import { API_URL, HTTP_STATUS } from '../../constants';

class UsersService {
  usersUrl = `${API_URL}users/`;

  async getUser(id: string, token: string) {
    const response = await fetch(`${this.usersUrl}${id}`, {
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

const usersService = new UsersService();

export default usersService;
