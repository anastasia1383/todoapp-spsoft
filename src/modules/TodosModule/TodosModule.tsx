import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import usePermissions from '../../hooks/usePermissions';
import { useAppSelector } from '../../store/store';

export const TodosModule = () => {
  const editingMode = useAppSelector((state) => state.settings.editingMode);
  const { canEdit } = usePermissions();

  return (
    <div className="flex gap-4 min-h-full flex-col justify-center px-6 py-12 lg:px-8 max-w-3xl">
      {editingMode && canEdit && <TodoForm />}
      <TodoList />
    </div>
  );
};
