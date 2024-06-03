import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { UserCredentials } from '../../types/user.types';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { login } from '../../store/auth.slice';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserCredentials>();

  const onSubmit = (data: UserCredentials) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (error) {
      setError('email', { message: error });
    }
  }, [error, setError]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>

            <div className="mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                defaultValue={''}
                {...register('email', { required: true })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {errors.email && <span className="mt-2 text-sm text-red-500 ">{errors.email.message}</span>}
          </div>
        </form>
      </div>
    </div>
  );
};
