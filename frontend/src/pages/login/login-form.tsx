import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "@/features/auth/auth";
import { useAuth } from "@/features/auth/useAuth";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loadUser } = useAuth();

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    // Handle login logic here
    try {
      const data = await login(username, password);

      localStorage.setItem("access_token", data.access_token);
      await loadUser();
      navigate("/dashboard");
    } catch (error) {
      alert("Login gagal: " + error);
    }
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen w-full bg-background",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-6 w-full max-w-sm px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Selamat Datang</CardTitle>
            <CardDescription>
              Login dengan akun Anda untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Field>
                  <Button type="submit">Login</Button>
                  <FieldDescription className="text-center">
                    Belum&apos;punya akun <a href="/register">Daftar Akun</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
