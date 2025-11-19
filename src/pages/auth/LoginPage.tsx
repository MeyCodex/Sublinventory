import { useState } from "react";
import logo from "@/assets/logo.webp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { loginSchema, type LoginFormInputs } from "@/schemas/authSchema";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isButtonLoading, error: authError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setServerError(null);
    await login(data);
  };

  return (
    <div className="relative w-full max-w-sm rounded-2xl bg-gray-800 p-8 pt-24 shadow-xl transition-all duration-300 ease-out animate-fade-in md:max-w-md ">
      <img
        src={logo}
        alt="Logo Subliminarte Graphic"
        className="absolute left-1/2 top-0 h-40 w-auto -translate-x-1/2 -translate-y-[60%] object-contain drop-shadow-xl md:h-48 "
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormField
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="Introduce tu correo"
          register={register("email")}
          error={errors.email}
          variant="brand"
        />

        <div className="relative">
          <FormField
            id="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••"
            register={register("password")}
            error={errors.password}
            variant="brand"
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-0 top-[37px] flex items-center pr-3 text-gray-600 hover:text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <RiEyeOffLine className="h-5 w-5" />
            ) : (
              <RiEyeLine className="h-5 w-5" />
            )}
          </button>
        </div>

        {authError && (
          <p className="rounded-md bg-red-900/50 p-3 text-sm text-red-300 ...">
            {authError}
          </p>
        )}

        <Button
          type="submit"
          isLoading={isButtonLoading}
          loadingText="Iniciando sesión..."
          className="mt-2"
          variant="brand"
        >
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
}
