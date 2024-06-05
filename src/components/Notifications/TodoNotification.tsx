export const TodoNotification = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 bg-white shadow-md max-w-md p-4">
      <p>
        <span className="font-bold">Fake API: </span>The application utilizes 
        {' '}<a
          className="text-indigo-600 hover:text-indigo-700 underline"
          href="https://jsonplaceholder.typicode.com/"
        >
          JSON placeholder
        </a>{' '}
        as a mock server to simulate backend interactions such as user
        authentication and permission checks.
      </p>
      <p>
        <span className="font-bold">Local Storage: </span>Adding, editing, and
        deleting TODO items are implemented using local storage. User
        authentication details and TODO items are stored locally during a
        session. However, changes made during the session won't persist after
        logging out.
      </p>
    </div>
  );
};
