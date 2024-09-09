import Header from "@/components/header";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  return (
    <>
      <Header />

      <section className="bg-gray-100 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white rounded-2xl shadow-md px-8 py-10">
            <RegisterForm />
          </div>
        </div>
      </section>
    </>
  );
}
