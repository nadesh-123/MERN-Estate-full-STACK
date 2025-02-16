import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  
  
  const { currentUser } = useSelector((state) => state.user);
  console.log("private>>>>>>>>",currentUser);
  return currentUser!=null ? <Outlet /> : <Navigate to='/sign-in' />;
}