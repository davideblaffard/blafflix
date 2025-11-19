import { MainLayout } from "@/components/layout/MainLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Registrati – Blafflix"
};

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="flex min-h-[70vh] items-center justify-center bg-[url('https://images.pexels.com/photos/3746311/pexels-photo-3746311.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 w-full px-4 py-12 md:px-0">
          <RegisterForm />
        </div>
      </div>
    </MainLayout>
  );
}
