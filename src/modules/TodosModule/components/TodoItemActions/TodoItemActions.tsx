import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Todo } from '../../../../types/todo.types';

interface TodoItemActionsProps {
  todo: Todo;
  handleEditTodo: (todo: Todo) => void;
  handleDeleteTodo: (todo: Todo) => void;
}

export const TodoItemActions: React.FC<TodoItemActionsProps> = ({
  todo,
  handleEditTodo,
  handleDeleteTodo,
}) => {
  return (
    <div className="flex gap-2 ml-auto pl-2">
      <button onClick={() => handleEditTodo(todo)}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button onClick={() => handleDeleteTodo(todo)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};
