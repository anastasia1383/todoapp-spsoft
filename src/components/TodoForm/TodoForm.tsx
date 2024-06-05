import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { createTodo } from '../../store/todos.slice';
import { TodoPayload } from '../../types/todo.types';

export const TodoForm = () => {
  const dispatch = useAppDispatch();
  const { isAdding } = useAppSelector((state) => state.todos);
  const { user } = useAppSelector((state) => state.sessionData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoPayload>();

  const onSubmit = (data: TodoPayload) => {
    const payload = { ...data, userId: user!.id };
    dispatch(createTodo(payload));
    reset();
  };

  return (
    <>
      <form className="flex gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="block grow w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
          type="text"
          placeholder="Enter your todo title"
          defaultValue={''}
          {...register('title', {
            required: 'Todo title is required',
            pattern: {
              value: /\S+/,
              message: 'Todo title cannot be an empty string',
            },
          })}
        />
        <button
          className="flex justify-center min-w-40 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          {isAdding ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {errors.title && (
        <span className="mt-2 text-sm text-red-500 ">
          {errors.title.message}
        </span>
      )}
    </>
  );
};
