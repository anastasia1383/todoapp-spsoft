import { useEffect } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { fetchTodos } from '../../store/todos.slice';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todos, status, errors } = useAppSelector(
    (state: RootState) => state.todos
  );

  const userId = useAppSelector((state) => state.sessionData.user?.id);

  useEffect(() => {
    dispatch(fetchTodos({ userId: userId! }));
  }, [userId, dispatch]);

  return (
    <div className="flex flex-col gap-2 bg-white shadow-md p-4">
      <h1>Todos</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{errors.load}</p>}
      {status === 'succeeded' && (
        <ul className='divide-y'>
          {todos.map((todo) => (
            <li key={todo.id} className="py-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {}}
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
