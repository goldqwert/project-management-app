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

  async editUser(id: string, token: string, { name, login, password }: ISignUpData) {
    const response = await fetch(`${this.usersUrl}${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, login, password }),
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

  async deleteUser(id: string, token: string) {
    const response = await fetch(`${this.usersUrl}${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (response.status === HTTP_STATUS.NO_CONTENT) {
      return;
    }

    const data = await response.json();

    throw new Error(data.message);
  }
}

const usersService = new UsersService();

export default usersService;
