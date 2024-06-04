import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { editTodo, fetchTodos } from '../../store/todos.slice';
import { sortTodos } from '../../helpers/sortTodos';
import { TodoModel } from '../../types/todo.types';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todos, status, errors, shouldLoadTodos } = useAppSelector(
    (state: RootState) => state.todos
  );
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [todoValues, setTodoValues] = useState<{ [key: string]: string }>({});

  const userId = useAppSelector((state) => state.sessionData.user?.id);

  useEffect(() => {
    if (shouldLoadTodos) {
      dispatch(fetchTodos({ userId: userId! }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    const initialTodoValues = todos.reduce((acc, todo) => {
      acc[todo.id] = todo.title;
      return acc;
    }, {} as { [key: string]: string });
    setTodoValues(initialTodoValues);
  }, [todos]);

  const sortedTodos = useMemo(() => {
    return sortTodos(todos);
  }, [todos]);

  const updateTodo = (todo: Partial<TodoModel>, updateDate = true) => {
    dispatch(editTodo({ todo, updateDate }));
  };

  const onCheckComplete = (todo: TodoModel) => {
    const updatePayload = {
      ...todo,
      completed: !todo.completed,
    };

    updateTodo(updatePayload);
  };

  const handleEditTodo = (todo: TodoModel) => {
    setEditMode((prev) => ({ ...prev, [todo.id]: true }));
  };

  const handleSaveTodo = (todo: TodoModel) => {
    const updatedTodo = { ...todo, title: todoValues[todo.id] };
    updateTodo(updatedTodo, false);
    // dispatch(editTodo(updatedTodo));
    setEditMode((prev) => ({ ...prev, [todo.id]: false }));
  };

  const handleCancelEdit = (todo: TodoModel) => {
    setEditMode((prev) => ({ ...prev, [todo.id]: false }));
  };

  const handleBlur = (todo: TodoModel) => {
    handleSaveTodo(todo);
  };

  const handleKeyDown = (e: React.KeyboardEvent, todo: TodoModel) => {
    if (e.key === 'Escape') {
      handleCancelEdit(todo);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    setTodoValues((prev) => ({ ...prev, [todoId]: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-2 bg-white shadow-md p-4">
      <h1>Todos</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{errors.load}</p>}
      {status === 'succeeded' && (
        <ul className="divide-y">
          {sortedTodos.map((todo) => (
            <li key={todo.id} className="py-2 flex">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  onCheckComplete(todo);
                }}
                className="mr-2"
              />
              {editMode[todo.id] ? (
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  type="text"
                  autoFocus
                  value={todoValues[todo.id]}
                  onChange={(e) => handleChange(e, todo.id.toString())}
                  onBlur={() => handleBlur(todo)}
                  onKeyDown={(e) => handleKeyDown(e, todo)}
                />
              ) : (
                <p>{todo.title}</p>
              )}
              <div className="flex gap-2 ml-auto pl-2">
                <button onClick={() => handleEditTodo(todo)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
