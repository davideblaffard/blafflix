"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!email) nextErrors.email = "Email obbligatoria.";
    if (!password || password.length < 4) {
      nextErrors.password = "Minimo 4 caratteri.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await login(email, password);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded bg-black/80 p-6 shadow-xl"
    >
      <h1 className="mb-2 text-2xl font-bold">Accedi</h1>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="mt-2 w-full justify-center"
      >
        {isLoading ? <Spinner /> : "Accedi"}
      </Button>
      <p className="mt-2 text-xs text-neutral-400">
        Nuovo su Blafflix?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="text-white underline"
        >
          Registrati ora.
        </button>
      </p>
    </form>
  );
}
