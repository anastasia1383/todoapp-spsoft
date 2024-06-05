export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export type UserCredentials = {
  email: string;
};

export enum GuardedActions {
  EDIT = 'edit',
}

export interface PermissionsRequest {
  id: number;
  permissions: GuardedActions[];
}

export interface PermissionsResponse {
  permissions: GuardedActions[];
}
