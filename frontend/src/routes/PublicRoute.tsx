import { Navigate } from "react-router-dom";

export default function PublicRoute({
  children,
}: {
  children: React.JSX.Element;
}) {
  const isLoggedIn = !!localStorage.getItem("access_token");

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
