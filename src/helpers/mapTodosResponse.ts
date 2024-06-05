import { Todo } from '../types/todo.types';

export const mapTodoResponse = (todo: Todo): Todo => {
  const mapped: Partial<Todo> = {
    id: todo.id,
    userId: todo.userId,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt || Date.now().toString(),
    deleted: todo.deleted || false,
  };

  if (todo.updatedAt) {
    mapped.updatedAt = todo.updatedAt;
  }

  return mapped as Todo;
};
