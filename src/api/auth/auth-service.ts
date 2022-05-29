import { API_URL, HTTP_STATUS } from '../../constants';

class AuthService {
  async signUp({ name, login, password }: ISignUpData) {
    const response = await fetch(`${API_URL}signup`, {
      method: 'POST',
      body: JSON.stringify({ name, login, password }),
      headers: {
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

  async signIn({ login, password }: ISignInData) {
    const response = await fetch(`${API_URL}signin`, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: {
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

const authService = new AuthService();

export default authService;
