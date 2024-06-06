import { useEffect, useState } from 'react';

import { logout } from '../../store/auth.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  checkUserPermissions,
  resetPermissions,
} from '../../store/permissions.slice';
import { reset } from '../../store/todos.slice';
import { Switcher } from '../Switcher/Switcher';
import { GuardedActions } from '../../types/user.types';
import { resetEditingMode, setEditingMode } from '../../store/setting.slice';
import usePermissions from '../../hooks/usePermissions';

export const Profile = () => {
  const [permissionsRequested, setPermissionsRequested] = useState(false);
  const [switcherTouched, setSwitcherTouched] = useState(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.sessionData.user);
  const { permissions, error } = useAppSelector((state) => state.permissions);
  const isEditMode = useAppSelector((state) => state.settings.editingMode);
  const { canEdit } = usePermissions();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetPermissions());
    dispatch(resetEditingMode());
  };

  const handleCheckboxChange = () => {
    setSwitcherTouched(true);
    if (!isEditMode) {
      setPermissionsRequested(true);
    } else {
      dispatch(setEditingMode(false));
      setPermissionsRequested(false);
    }
  };

  useEffect(() => {
    if (permissionsRequested) {
      dispatch(
        checkUserPermissions({
          id: user!.id,
          permissions: [GuardedActions.EDIT],
        })
      );
    }
  }, [permissionsRequested]);

  useEffect(() => {
    if (permissionsRequested && canEdit) {
      dispatch(setEditingMode(true));
    } else {
      dispatch(setEditingMode(false));
    }
  }, [permissionsRequested, permissions, dispatch]);

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
            <p className="text-green-500">{`You have permission to ${permissions.join(
              ', '
            )} this list`}</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
};
