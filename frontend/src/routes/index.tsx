import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Login from "@/pages/login/login-form";
import Dashboard from "@/pages/dashboard/app-sidebar";
import Test from "@/pages/login/test";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <Dashboard />
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
