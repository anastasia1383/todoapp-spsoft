import { useEffect, useMemo } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchTodos } from '../../../../store/todos.slice';
import { sortTodos } from '../../../../helpers/sortTodos';
import { TodoItem } from '../TodoItem/TodoItem';
import { Status } from '../../../../types/status.enum';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const editingMode = useAppSelector((state) => state.settings.editingMode);
  const userId = useAppSelector((state) => state.sessionData.user?.id);
  const { todos, status, errors, shouldLoadTodos } = useAppSelector(
    (state: RootState) => state.todos
  );

  const sortedTodos = useMemo(() => {
    return sortTodos(todos);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return editingMode
      ? sortedTodos
      : sortedTodos.filter((todo) => !todo.deleted);
  }, [sortedTodos, editingMode]);

  useEffect(() => {
    if (shouldLoadTodos) {
      dispatch(fetchTodos({ userId: userId! }));
    }
  }, [userId, dispatch]);

  return (
    <div className="flex flex-col gap-2 bg-white shadow-md">
      <h1 className="px-4">Todos</h1>
      {status === Status.Failed && <p>{errors.load}</p>}

      <ul className="divide-y">
        {visibleTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};
