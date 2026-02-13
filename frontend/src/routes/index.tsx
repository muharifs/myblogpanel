import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Login from "@/pages/login/login-form";
import Register from "@/pages/register/signup-form";
import PublicRoute from "./PublicRoute";
import Dashboard from "@/pages/dashboard/dashboard";
import BlogList from "@/pages/blog/blog";
import ProtectedRoute from "./ProtectedRoute";
import DashboardHome from "@/pages/dashboard/dashboard-home";
import CategoryPage from "@/pages/categories/category-page";
import PostsPage from "@/pages/post/posts-page";
import { AuthProvider } from "@/features/auth/AuthContext";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<BlogList />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <Dashboard />
                  </SidebarProvider>
                </ProtectedRoute>
              }
            >
              {/* child routes */}
              <Route index element={<DashboardHome />} />
              <Route path="categories" element={<CategoryPage />} />
              <Route path="posts" element={<PostsPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
