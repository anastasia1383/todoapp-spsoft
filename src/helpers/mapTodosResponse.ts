import { TodoModel, Todo } from '../types/todo.types';

export const mapTodoResponse = (todo: TodoModel): Todo => {
  const mapped: Partial<Todo> = {
    id: todo.id,
    userId: todo.userId,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt || Date.now().toString(),
  };

  if (todo.updatedAt) {
    mapped.updatedAt = todo.updatedAt;
  }

  return mapped as Todo;
};
