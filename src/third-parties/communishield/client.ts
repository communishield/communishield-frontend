import axios, { AxiosError } from 'axios';
import { UsernameAlreadyInUse } from './errors/username-already-in-use';
import { UnexpectedError } from '../../errors/unexpected.error';
import { AuthenticationError } from './errors/authentication.error';
import { InsufficientPermissionsError } from './errors/insufficient-permissions.error';
import { EntityNotFoundError } from './errors/entity-not-found.error';
import { NotAuthenticatedError } from './errors/not-authenticated.error';

export class Communishield {
  private static http = axios.create({
    baseURL: 'http://localhost:3000',
  });

  static setToken(token: string) {
    this.http.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

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

  static async getUser(username: string) {
    try {
      const { data } = await Communishield.http.get<{
        username: string;
        groups: string[];
      }>(`/api/v1/users/${username}`);

      return data;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new NotAuthenticatedError();
        }

        if (error.response?.status === 403) {
          throw new InsufficientPermissionsError();
        }

        if (error.response?.status === 404) {
          throw new EntityNotFoundError('User');
        }
      }

      throw new UnexpectedError();
    }
  }
}
