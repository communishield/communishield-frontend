import axios, { AxiosError } from 'axios';
import { UsernameAlreadyInUse } from './errors/username-already-in-use';
import { UnexpectedError } from '../../errors/unexpected.error';
import { AuthenticationError } from './errors/authentication.error';

export class Communishield {
  private static http = axios.create({
    baseURL: 'http://localhost:3000',
  });

  static async signup({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      await Communishield.http.post('/api/v1/users', {
        username,
        password,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          throw new UsernameAlreadyInUse();
        }
      }

      throw new UnexpectedError();
    }
  }

  static async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const {
        data: { token },
      } = await Communishield.http.post<{ token: string }>(
        '/api/v1/auth/login',
        {
          username,
          password,
        }
      );

      return token;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new AuthenticationError();
        }
      }

      throw new UnexpectedError();
    }
  }
}
