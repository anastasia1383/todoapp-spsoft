export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
  deleted: boolean;
}

export interface TodoPayload {
  userId: number;
  title: string;
  completed: boolean;
}

export interface GetTodosPayload {
  userId: number;
}
