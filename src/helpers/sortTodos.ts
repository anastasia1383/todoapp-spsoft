import { Todo } from '../types/todo.types';

export const sortTodos = (todos: Todo[]): Todo[] => {
  const completedTodos = todos.filter(todo => todo.completed);
  const uncompletedTodos = todos.filter(todo => !todo.completed);

  completedTodos.sort((a, b) => {
    if (a.updatedAt && b.updatedAt) {
      return +b.updatedAt - +a.updatedAt;
    } else if (a.updatedAt) {
      return -1;
    } else if (b.updatedAt) {
      return 1;
    }
    return 0;
  });

  uncompletedTodos.sort((a, b) => {
    if (a.updatedAt && b.updatedAt) {
      return +a.updatedAt - +b.updatedAt;
    } else if (a.updatedAt) {
      return 1;
    } else if (b.updatedAt) {
      return -1;
    }
    return 0;
  });

  return [...uncompletedTodos, ...completedTodos];
};

