import { User } from '../types/user.types';
import { client } from './apiService';

export const getUser = async (email: string): Promise<User> => {
  const response = await client.get<User[]>(`/users?email=${email}`);

  if(response.length === 0) {
    throw new Error('User not found');
  }

  return response[0];
};
