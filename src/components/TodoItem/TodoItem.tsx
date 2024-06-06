import { useState } from 'react';
import classNames from 'classnames';

import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { editTodo, removeTodo } from '../../store/todos.slice';
import { Todo } from '../../types/todo.types';
import { GuardedActions } from '../../types/user.types';
import { TodoItemActions } from '../TodoItemActions/TodoItemActions';
import { TodoItemTitleField } from '../TodoItemTitleField/TodoItemTitleField';
import { TodoItemCheckbox } from '../TodoItemCheckbox/TodoItemCheckbox';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: RootState) => state.todos);

  const [editForTodoId, setEditForTodoId] = useState<number | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState<string>('');

  const updateTodo = (todo: Partial<Todo>, updateDate = true) => {
    dispatch(editTodo({ todo, updateDate }));
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodoTitle(todo.title);
    setEditForTodoId(todo.id);
  };

  const handleDeleteTodo = (todo: Todo) => {
    const deletePayload = {
      ...todo,
      deleted: true,
    };
    dispatch(removeTodo(deletePayload));
  };

  const editingMode = useAppSelector((state) => state.settings.editingMode);
  const permissions = useAppSelector((state) => state.permissions.permissions);

  const hasEditPermission = permissions.includes(GuardedActions.EDIT);

  return (
    <li
      key={todo.id}
      className={classNames('py-2 flex items-center min-h-14 p-4', {
        'bg-gray-100 text-gray-500': todo.deleted === true,
      })}
    >
      {isLoading.includes(todo.id) ? (
        <p>Loading...</p>
      ) : (
        <>
          <TodoItemCheckbox todo={todo} updateTodo={updateTodo} />

          <TodoItemTitleField
            todo={todo}
            isEditMode={editForTodoId === todo.id}
            updateTodo={updateTodo}
            editingTodoTitle={editingTodoTitle}
            setEditingTodoTitle={setEditingTodoTitle}
            setEditForTodoId={setEditForTodoId}
          />

          {todo.deleted === false && editingMode && hasEditPermission && (
            <TodoItemActions
              todo={todo}
              handleEditTodo={handleEditTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          )}
        </>
      )}
    </li>
  );
};
