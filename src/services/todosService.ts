import { generateTodoId } from '../helpers/generateTodoId';
import { mapTodoResponse } from '../helpers/mapTodosResponse';
import { TodoModel, TodoPayload, Todo } from '../types/todo.types';
import { client } from './apiService';

export const getTodos = async (userId: number): Promise<Todo[]> => {
  const response = await client.get<TodoModel[]>(`/users/${userId}/todos`);
  return response.map(mapTodoResponse);
};

export const addTodos = async (data: TodoPayload): Promise<Todo> => {
  const { userId } = data;
  const response = await client.post<TodoModel>(`/users/${userId}/todos`, data);

  const newTodo = mapTodoResponse({ ...response, ...data });
  newTodo.id = generateTodoId();
  newTodo.completed = false;

  return newTodo;
};

export const updateTodos = async (data: Partial<TodoModel>, updateDate: boolean): Promise<Todo> => {
  const { id, ...todo } = data;
  const response = await client.patch<TodoModel>(`/todos/${id}`, todo);
  const updatedTodo = mapTodoResponse({ ...response, ...data });
  
  if (updateDate) {
    updatedTodo.updatedAt = Date.now().toString();
  }
  
  return updatedTodo;
};

export const deleteTodos = async (data: Partial<TodoModel>): Promise<Todo> => {
  const { id } = data;
  const response = await client.delete<TodoModel>(`/todos/${id}`);

  return mapTodoResponse(response);
};
