import axios, { AxiosError } from 'axios';
import { UsernameAlreadyInUse } from './errors/username-already-in-use';
import { UnexpectedError } from '../../errors/unexpected.error';
import { AuthenticationError } from './errors/authentication.error';
import { InsufficientPermissionsError } from './errors/insufficient-permissions.error';
import { EntityNotFoundError } from './errors/entity-not-found.error';
import { NotAuthenticatedError } from './errors/not-authenticated.error';
import { User, UserToken } from './types/user';
import { Directory } from './types/directory';
import { File } from './types/file';
import { EntityAlreadyExistsError } from './errors/entity-already-exists.error';
import { InvalidRequestError } from './errors/invalid-request.error';

export class Communishield {
  private static http = axios.create({
    baseURL: '',
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
      } = await Communishield.http.post<UserToken>('/api/v1/auth/login', {
        username,
        password,
      });

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
      const { data } = await Communishield.http.get<User>(
        `/api/v1/users/${username}`
      );

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

  static async getDirectory(path: string) {
    try {
      const { data } = await Communishield.http.get<Directory>(
        `/api/v1/directories/${encodeURIComponent(path)}`
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new NotAuthenticatedError();
        }

        if (error.response?.status === 403) {
          throw new InsufficientPermissionsError();
        }

        if (error.response?.status === 404) {
          throw new EntityNotFoundError('Directory');
        }
      }

      throw new UnexpectedError();
    }
  }

  static async getFile(path: string) {
    try {
      const { data } = await Communishield.http.get<File>(
        `/api/v1/files/${encodeURIComponent(path)}`
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new NotAuthenticatedError();
        }

        if (error.response?.status === 403) {
          throw new InsufficientPermissionsError();
        }

        if (error.response?.status === 404) {
          throw new EntityNotFoundError('File');
        }
      }

      throw new UnexpectedError();
    }
  }

  static async updateFile(path: string, file: Omit<File, 'path'>) {
    try {
      await Communishield.http.put(
        `/api/v1/files/${encodeURIComponent(path)}`,
        file
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          throw new InvalidRequestError(error.response.data);
        }

        if (error.response?.status === 401) {
          throw new NotAuthenticatedError();
        }

        if (error.response?.status === 403) {
          throw new InsufficientPermissionsError();
        }

        if (error.response?.status === 404) {
          throw new EntityNotFoundError('File');
        }
      }

      throw new UnexpectedError();
    }
  }

  static async deleteFile(path: string) {
    try {
      await Communishield.http.delete(
        `/api/v1/files/${encodeURIComponent(path)}`
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new NotAuthenticatedError();
        }

        if (error.response?.status === 403) {
          throw new InsufficientPermissionsError();
        }

        if (error.response?.status === 404) {
          throw new EntityNotFoundError('File');
        }
      }

      throw new UnexpectedError();
    }
  }

  static async createFile(file: File) {
    const { path, ...payload } = file;

    try {
      await Communishield.http.post(
        `/api/v1/files/${encodeURIComponent(path)}`,
        payload
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          throw new InvalidRequestError(error.response.data);
        }

        if (error.response?.status === 401) {
          throw new NotAuthenticatedError();
        }

        if (error.response?.status === 403) {
          throw new InsufficientPermissionsError();
        }

        if (error.response?.status === 409) {
          throw new EntityAlreadyExistsError('File');
        }
      }

      throw new UnexpectedError();
    }
  }

  static async createDirectory(directory: Omit<Directory, 'contents'>) {
    const { path, ...payload } = directory;

    try {
      await Communishield.http.post(
        `/api/v1/directories/${encodeURIComponent(path)}`,
        payload
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          throw new InvalidRequestError(error.response.data);
        }

        if (error.response?.status === 401) {
          throw new NotAuthenticatedError();
        }

        if (error.response?.status === 403) {
          throw new InsufficientPermissionsError();
        }

        if (error.response?.status === 409) {
          throw new EntityAlreadyExistsError('Directory');
        }
      }

      throw new UnexpectedError();
    }
  }

  static async deleteDirectory(path: string) {
    try {
      await Communishield.http.delete(
        `/api/v1/directories/${encodeURIComponent(path)}`
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new NotAuthenticatedError();
        }

        if (error.response?.status === 403) {
          throw new InsufficientPermissionsError();
        }

        if (error.response?.status === 404) {
          throw new EntityNotFoundError('Directory');
        }
      }

      throw new UnexpectedError();
    }
  }

  static async updateDirectory(
    path: string,
    directory: Omit<Directory, 'path' | 'contents'>
  ) {
    try {
      await Communishield.http.put(
        `/api/v1/directories/${encodeURIComponent(path)}`,
        directory
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          throw new InvalidRequestError(error.response.data);
        }

        if (error.response?.status === 401) {
          throw new NotAuthenticatedError();
        }

        if (error.response?.status === 403) {
          throw new InsufficientPermissionsError();
        }

        if (error.response?.status === 404) {
          throw new EntityNotFoundError('Directory');
        }
      }

      throw new UnexpectedError();
    }
  }
}
