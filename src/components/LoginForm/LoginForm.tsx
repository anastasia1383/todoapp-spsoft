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
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          defaultValue={''}
          placeholder="Enter your email"
          {...register('email', { required: true })}
        />
        <button type="submit">{isLoading ? 'Logging in...' : 'Login'}</button>
        {errors.email && <span>{errors.email.message}</span>}
      </form>
    </div>
  );
};
