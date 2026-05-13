import { Outlet } from 'react-router-dom';

export default function ProtectedRoute({ unauthenticatedElement }) {
  return unauthenticatedElement || <Outlet />;
}
