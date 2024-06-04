import { logout } from '../../store/auth.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { reset } from '../../store/todos.slice';
import { Switcher } from '../Switcher/Switcher';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const userName = useAppSelector((state) => state.sessionData.user?.name);

  return (
    <div className="flex flex-col gap-2 fixed top-0 right-0 w-300 bg-white shadow-md p-4">
      <h1>{`Welcome, ${userName}!`}</h1>
      <button
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleLogout}
      >
        Logout
      </button>
      <Switcher />
    </div>
  );
};
