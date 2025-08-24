import { useSelector } from "react-redux";
import {type RootState } from "../store/store";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: any }) {
  const userExists = useSelector((state: RootState) => state.user.exists);

  if (!userExists) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
