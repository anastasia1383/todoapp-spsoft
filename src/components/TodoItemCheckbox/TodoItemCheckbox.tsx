import { Todo } from '../../types/todo.types';

interface TodoItemCheckboxProps {
  todo: Todo;
  updateTodo: (todo: Todo, updateDate: boolean) => void;
}

export const TodoItemCheckbox: React.FC<TodoItemCheckboxProps> = ({
  todo,
  updateTodo,
}) => {
  const onCheckComplete = (todo: Todo) => {
    const updatePayload = {
      ...todo,
      completed: !todo.completed,
    };

    updateTodo(updatePayload, true);
  };
  return (
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => {
        onCheckComplete(todo);
      }}
      className="mr-2"
      disabled={todo.deleted === true}
    />
  );
};
