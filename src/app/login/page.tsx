import { MainLayout } from "@/components/layout/MainLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Accedi – Blafflix"
};

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="flex min-h-[70vh] items-center justify-center bg-[url('https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 w-full px-4 py-12 md:px-0">
          <LoginForm />
        </div>
      </div>
    </MainLayout>
  );
}
