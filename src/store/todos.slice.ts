import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { GetTodosPayload, Todo, TodoPayload } from '../types/todo.types';
import {
  addTodos,
  deleteTodos,
  getTodos,
  updateTodos,
} from '../services/todosService';

export type TodoStateErrors = {
  load: string | null;
  create: string | null;
  update: string | null;
  remove: string | null;
};

export type TodosState = {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: TodoStateErrors;
  shouldLoadTodos: boolean;
  isLoading: number[];
  isAdding: boolean;
};

const initialState: TodosState = {
  todos: [],
  status: 'idle',
  errors: {
    load: null,
    create: null,
    update: null,
    remove: null,
  },
  shouldLoadTodos: true,
  isLoading: [],
  isAdding: false,
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  GetTodosPayload,
  { rejectValue: string }
>('todos/fetchTodos', async ({ userId }, { rejectWithValue }) => {
  try {
    const data = await getTodos(userId!);
    return data;
  } catch (e: unknown) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const createTodo = createAsyncThunk<
  Todo,
  TodoPayload,
  { rejectValue: string }
>('todos/createTodo', async (newTodo, { rejectWithValue }) => {
  try {
    const data = await addTodos(newTodo);
    return data;
  } catch (e: unknown) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const editTodo = createAsyncThunk<
  Todo,
  { todo: Partial<Todo>; updateDate: boolean },
  { rejectValue: string }
>('todos/editTodo', async (payload, { rejectWithValue }) => {
  const { todo, updateDate } = payload;

  try {
    const data = await updateTodos(todo, updateDate);

    return data;
  } catch (e: unknown) {
    const error = e as Error;

    return rejectWithValue(error.message);
  }
});

export const removeTodo = createAsyncThunk<
  Todo,
  Todo,
  { rejectValue: string }
>('todos/removeTodo', async (todo, { rejectWithValue }) => {
  try {
    const data = await deleteTodos(todo);
    console.log(data);
    return data;
  } catch (e: unknown) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    reset: (state) => {
      state.todos = [];
      state.status = 'idle';
      state.errors = {
        load: null,
        create: null,
        update: null,
        remove: null,
      };
      state.shouldLoadTodos = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.errors.load = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
        state.errors.load = null;
        state.shouldLoadTodos = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.load = action.payload || 'Failed to fetch todos';
      })
      .addCase(createTodo.pending, (state) => {
        state.status = 'loading';
        state.errors.create = null;
        state.isAdding = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
        state.errors.create = null;
        state.isAdding = false;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.create = action.payload || 'Failed to create todo';
        state.isAdding = false;
      })
      .addCase(editTodo.pending, (state, action) => {
        state.status = 'loading';
        state.errors.update = null;
        const todoId = action.meta.arg.todo.id;
        if (todoId !== undefined) {
          state.isLoading.push(todoId);
        }
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        state.errors.update = null;
        const todoId = action.payload.id;
        state.isLoading = state.isLoading.filter((id) => id !== todoId);
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.update = action.payload || 'Failed to edit todo';
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.status = 'loading';
        state.errors.remove = null;
        const todoId = action.meta.arg.id;
        if (todoId !== undefined) {
          state.isLoading.push(todoId);
        }
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);

        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        const todoId = action.payload.id;
        state.isLoading = state.isLoading.filter((id) => id !== todoId);
        state.errors.remove = null;
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.remove = action.payload || 'Failed to delete todo';
      });
  },
});

export const { reset } = todosSlice.actions;

export default todosSlice.reducer;
