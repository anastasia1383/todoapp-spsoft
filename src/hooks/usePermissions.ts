import { useSelector } from 'react-redux';
import { GuardedActions } from '../types/user.types';
import { RootState } from '../store/store';

const usePermissions = () => {
  const permissions = useSelector((state: RootState) => state.permissions.permissions);

  const hasPermission = (action: GuardedActions) => {
    return permissions.includes(action);
  };

  const canEdit = hasPermission(GuardedActions.EDIT);

  return { canEdit };
};

export default usePermissions;