import { useEffect, useState } from 'react';

import { logout } from '../../store/auth.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { checkUserPermissions, resetPermissions } from '../../store/permissions.slice';
import { reset } from '../../store/todos.slice';
import { Switcher } from '../Switcher/Switcher';
import { GuardedActions } from '../../types/user.types';

export const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [permissionsRequested, setPermissionsRequested] = useState(false);
  const [switcherTouched, setSwitcherTouched] = useState(false);

  const user = useAppSelector((state) => state.sessionData.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetPermissions());
  };

  const { permissions, error } = useAppSelector((state) => state.permissions);

  useEffect(() => {
    if (permissionsRequested && !permissions.length) {
      dispatch(
        checkUserPermissions({
          id: user!.id,
          permissions: [GuardedActions.EDIT],
        })
      );
    }
  }, [permissionsRequested]);

  useEffect(() => {
    if (permissionsRequested && permissions.includes(GuardedActions.EDIT)) {
      setIsEditMode(permissions.includes(GuardedActions.EDIT));
    }
  }, [permissionsRequested, permissions.length]);

  const handleCheckboxChange = () => {
    setSwitcherTouched(true);
    if (!isEditMode) {
      setPermissionsRequested(!permissionsRequested);
    } else {
      setIsEditMode(false);
      setPermissionsRequested(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 fixed top-0 right-0 min-w-96 bg-white shadow-md p-4">
      <h1>{`Welcome, ${user!.name}!`}</h1>
      <button
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleLogout}
      >
        Logout
      </button>
      <Switcher
        isChecked={isEditMode}
        handleCheckboxChange={handleCheckboxChange}
      />
      {switcherTouched && (
        <div className="flex flex-col gap-2">
          {!!permissions.length && (
            <p className="text-green-500">{`You have permission to ${permissions.join(', ')} this list`}</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
};