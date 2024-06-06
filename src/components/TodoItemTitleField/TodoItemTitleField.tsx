import { Todo } from '../../types/todo.types';

interface TodoItemTitleFieldProps {
  todo: Todo;
  isEditMode: boolean;
  editingTodoTitle: string;
  updateTodo: (todo: Todo, updateDate: boolean) => void;
  setEditingTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditForTodoId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const TodoItemTitleField: React.FC<TodoItemTitleFieldProps> = ({
  todo,
  isEditMode,
  editingTodoTitle,
  updateTodo,
  setEditingTodoTitle,
  setEditForTodoId,
}) => {
  const handleSaveTodo = (todo: Todo) => {
    if (editingTodoTitle.trim() === '') {
      setEditingTodoTitle(todo.title);
    } else {
      const updatedTodo = { ...todo, title: editingTodoTitle };
      updateTodo(updatedTodo, false);
      handleCancelEdit();
    }
  };

  const handleCancelEdit = () => {
    setEditForTodoId(null);
    setEditingTodoTitle('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTodoTitle(e.target.value);
  };

  const handleBlur = (todo: Todo) => {
    handleSaveTodo(todo);
  };

  const handleKeyDown = (e: React.KeyboardEvent, todo: Todo) => {
    if (e.key === 'Escape') {
      handleCancelEdit();
    }

    if (e.key === 'Enter') {
      handleSaveTodo(todo);
    }
  };

  return (
    <>
      {isEditMode ? (
        <input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
          type="text"
          autoFocus
          value={editingTodoTitle}
          onChange={(e) => handleChange(e)}
          onBlur={() => handleBlur(todo)}
          onKeyDown={(e) => handleKeyDown(e, todo)}
        />
      ) : (
        <p>{todo.title}</p>
      )}
    </>
  );
};
