import { TodoForm } from '../../components/TodoForm/TodoForm';
import { TodoList } from '../../components/TodoList/TodoList';

export const TodosModule = () => {
  return (
    <div className="flex gap-4 min-h-full flex-col justify-center px-6 py-12 lg:px-8 max-w-max">
      <TodoForm />
      <TodoList />
    </div>
  );
};
