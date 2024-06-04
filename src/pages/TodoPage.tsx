import { Profile } from '../components/Profile/Profile';
import { TodosModule } from '../modules/TodosModule/TodosModule';

export const TodoPage = () => {
  return (
    <>
      <Profile />
      <TodosModule />
    </>
  );
};
