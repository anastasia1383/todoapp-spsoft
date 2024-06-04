import { Todo } from '../types/todo.types';

const sortByUpdatedAt = (a: Todo, b: Todo) => {
  const aValue = a.updatedAt ? +a.updatedAt : +a.createdAt;
  const bValue = b.updatedAt ? +b.updatedAt : +b.createdAt;

  return aValue - bValue;
};

export const sortTodos = (todos: Todo[]): Todo[] => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const uncompletedTodos = todos.filter((todo) => !todo.completed);

  uncompletedTodos.sort(sortByUpdatedAt);
  completedTodos.sort(sortByUpdatedAt);

  return [...uncompletedTodos, ...completedTodos];
};
