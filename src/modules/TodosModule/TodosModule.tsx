import { TodoForm } from '../../components/TodoForm/TodoForm';
import { TodoList } from '../../components/TodoList/TodoList';
import { useAppSelector } from '../../store/store';
import { GuardedActions } from '../../types/user.types';

export const TodosModule = () => {
  const editingMode = useAppSelector((state) => state.settings.editingMode);
  const permissions = useAppSelector((state) => state.permissions.permissions);

  const hasEditPermission = permissions.includes(GuardedActions.EDIT);

  return (
    <div className="flex gap-4 min-h-full flex-col justify-center px-6 py-12 lg:px-8 max-w-3xl">
      {editingMode && hasEditPermission && <TodoForm />}
      <TodoList />
    </div>
  );
};
