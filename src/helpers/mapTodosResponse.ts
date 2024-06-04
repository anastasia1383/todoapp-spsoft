import { TodoModel, Todo } from "../types/todo.types";

export const mapTodoResponse = (todo: TodoModel): Todo => {
  return {
    id: todo.id,
    userId: todo.userId,
    title: todo.title,
    completed: todo.completed,
    createdAt: Date.now().toString(),   
  };
};
