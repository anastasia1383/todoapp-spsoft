import { Todo, TodoPayload } from '../types/todo.types';
import { client } from './apiService';

export const getTodos = (userId: number): Promise<Todo[]> => {
  return client.get<Todo[]>(`/users/${userId}/todos`);
};

export const addTodos = (data: TodoPayload): Promise<Todo> => {
  const { userId, ...newTodo } = data;

  return client.post<Todo>(`/users/${userId}/todos`, newTodo);
};

export const updateTodos = (data: Partial<Todo>): Promise<Todo> => {
  const { userId, id, ...updatedTodo } = data;

  return client.patch<Todo>(`/users/${userId}/todos/${id}`, updatedTodo);
};

export const deleteTodos = (data: Partial<Todo>): Promise<Todo> => {
  const { userId, id } = data;

  return client.delete<Todo>(`/users/${userId}/todos/${id}`);
};
