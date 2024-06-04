import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  GetTodosPayload,
  TodoModel,
  Todo,
  TodoPayload,
} from '../types/todo.types';
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
  Partial<TodoModel>,
  { rejectValue: string }
>('todos/editTodo', async (todo, { rejectWithValue }) => {
  try {
    const data = await updateTodos(todo);
    const newTodo = {
      ...data,
      updatedAt: Date.now().toString(),
    }
    
    return newTodo;
  } catch (e: unknown) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const removeTodo = createAsyncThunk<
  Todo,
  Partial<Todo>,
  { rejectValue: string }
>('todos/removeTodo', async (todo, { rejectWithValue }) => {
  try {
    const data = await deleteTodos(todo);
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
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
        state.errors.create = null;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.create = action.payload || 'Failed to create todo';
      })
      .addCase(editTodo.pending, (state) => {
        state.status = 'loading';
        state.errors.update = null;
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
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.update = action.payload || 'Failed to edit todo';
      })
      .addCase(removeTodo.pending, (state) => {
        state.status = 'loading';
        state.errors.remove = null;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
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
