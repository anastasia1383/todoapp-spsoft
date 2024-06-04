import { mapTodoResponse } from '../helpers/mapTodosResponse';
import { TodoModel, TodoPayload, Todo } from '../types/todo.types';
import { client } from './apiService';

export const getTodos = async (userId: number): Promise<Todo[]> => {
  const response = await client.get<TodoModel[]>(`/users/${userId}/todos`);

  return response.map(mapTodoResponse);
};

export const addTodos = async (data: TodoPayload): Promise<Todo> => {
  const { userId, ...newTodo } = data;
  const response = await client.post<TodoModel>(`/users/${userId}/todos`, newTodo);

  return mapTodoResponse(response);
};

export const updateTodos = async (data: Partial<TodoModel>): Promise<Todo> => {
  const { id, ...updatedTodo } = data;
  const response = await client.patch<TodoModel>(`/todos/${id}`, updatedTodo);

  return mapTodoResponse(response);
};

export const deleteTodos = async (data: Partial<TodoModel>): Promise<Todo> => {
  const { id } = data;
  const response = await client.delete<TodoModel>(`/todos/${id}`);

  return mapTodoResponse(response);
};
