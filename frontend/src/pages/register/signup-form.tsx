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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/users", {
        name,
        username,
        password,
      });

      alert("Akun berhasil dibuat");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat akun");
    } finally {
      setLoading(false);
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
            <CardTitle className="text-xl">Daftar Akun Anda</CardTitle>
            <CardDescription>
              Buat akun baru untuk memulai perjalanan Anda bersama kami
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Nama Lengkap</FieldLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ex: johndoe"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukan Password"
                    required
                  />
                </Field>

                <Field>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Membuat..." : "Buat Akun"}
                  </Button>

                  <FieldDescription className="text-center">
                    Sudah mempunyai akun? <a href="/login">Masuk</a>
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
