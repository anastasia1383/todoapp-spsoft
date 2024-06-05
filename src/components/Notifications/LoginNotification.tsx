export const LoginNotification = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 bg-white shadow-md max-w-md p-4">
      <p>
        <span className="font-bold">User with permissions: </span>
        Sincere@april.biz
      </p>
      <p>
        <span className="font-bold">User without permissions: </span>
        Shanna@melissa.tv
      </p>
      <p>
        You can use any user email from{' '}
        <a
          className="text-indigo-600 hover:text-indigo-700 underline"
          href="https://jsonplaceholder.typicode.com/users"
        >
          JSON placeholder
        </a>{' '}
        to authorize
      </p>
    </div>
  );
};
