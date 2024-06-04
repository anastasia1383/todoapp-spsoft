import { useEffect, useMemo } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { editTodo, fetchTodos } from '../../store/todos.slice';
import { sortTodos } from '../../helpers/sortTodos';
import { TodoModel } from '../../types/todo.types';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todos, status, errors, shouldLoadTodos } = useAppSelector(
    (state: RootState) => state.todos
  );

  const userId = useAppSelector((state) => state.sessionData.user?.id);

  useEffect(() => {
    if (shouldLoadTodos) {
      dispatch(fetchTodos({ userId: userId! }));
    }
  }, [userId, dispatch]);

  const sortedTodos = useMemo(() => {
    return sortTodos(todos);
  }, [todos]);

  const updateTodo = (payload: Partial<TodoModel>) => {
    dispatch(editTodo(payload));
  };

  const onCheckComplete = (todo: TodoModel) => {
    const updatePayload = {
      ...todo,
      completed: !todo.completed,
    };

    updateTodo(updatePayload);
  };

  return (
    <div className="flex flex-col gap-2 bg-white shadow-md p-4">
      <h1>Todos</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{errors.load}</p>}
      {status === 'succeeded' && (
        <ul className="divide-y">
          {sortedTodos.map((todo) => (
            <li key={todo.id} className="py-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  onCheckComplete(todo);
                }}
                className="mr-2"
              />
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
