import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '../pages/LoginPage';
import { TodoPage } from '../pages/TodoPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const Routing = () => {
  return (
    <BrowserRouter basename="/todoapp-spsoft/">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoPage />
            </ProtectedRoute>
          }
        />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
