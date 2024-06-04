import {
  PermissionsRequest,
  PermissionsResponse,
  User,
} from '../types/user.types';
import { client } from './apiService';

export const getUser = async (email: string): Promise<User> => {
  const response = await client.get<User[]>(`/users?email=${email}`);

  if (response.length === 0) {
    throw new Error('User not found');
  }

  return response[0];
};

export const checkPermissions = async (
  req: PermissionsRequest
): Promise<PermissionsResponse> => {
  const { id, permissions } = req;
  const response = await client.get<User[]>(`/users/${id}`);

  if (response.length === 0) {
    throw new Error('User not found');
  }

  const requestedPermissions = permissions.join(', ');

  if (id % 2 === 0) {
    throw new Error(`User is not allowed to perform actions: ${requestedPermissions}`);
  }

  return {
    permissions,
  };
};
