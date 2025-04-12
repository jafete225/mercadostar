"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
    
    const router = useRouter();
    const wixClient = useWixClient();

   const  isLoggedIn = wixClient.auth.loggedIn();
   
   if (isLoggedIn) {
    router.push("/")
    
   }

  const [mode, setMode] = useState<MODE>(MODE.LOGIN);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    if (!email || (mode !== MODE.EMAIL_VERIFICATION && !password)) {
      setError("Por favor, preencha os campos obrigatórios.");
      setIsLoading(false);
      return;
    }

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({ email, password });
          break;

        case MODE.REGISTER:
          if (!username) {
            setError("Por favor, preencha o nome de usuário.");
            setIsLoading(false);
            return;
          }
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;

        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("E-mail de redefinição de senha enviado!");
          setIsLoading(false);
          return;

        case MODE.EMAIL_VERIFICATION:
          if (!emailCode) {
            setError("Por favor, insira o código de verificação.");
            setIsLoading(false);
            return;
          }
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          setMessage("E-mail verificado com sucesso!");
          setIsLoading(false);
          return;

        default:
          throw new Error("Modo desconhecido.");
      }

      if (!response || response.loginState === LoginState.FAILURE) {
        const errorMessage =
          response?.errorCode === "emailAlreadyExists"
            ? "O e-mail fornecido já está registrado. Faça login ou recupere sua senha."
            : `Erro inesperado: ${response?.error || "Tente novamente."}`;
        setError(errorMessage);
        return;
      }

      if (response.loginState === LoginState.SUCCESS) {
        setMessage("Login realizado com sucesso!");
        if (response.data?.sessionToken) {
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
        }
      }
    } catch (err: any) {
      console.error("Erro durante a ação:", err);
      setError(err.message || "Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] px-4 flex items-center justify-center">
      <form className="flex flex-col gap-6 w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">
          {mode === MODE.LOGIN
            ? "Log in"
            : mode === MODE.REGISTER
            ? "Register"
            : mode === MODE.RESET_PASSWORD
            ? "Reset Your Password"
            : "Verify Your Email"}
        </h1>

        {mode === MODE.REGISTER && (
          <div className="flex flex-col">
            <label className="text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ring-1 ring-gray-300 rounded p-2"
              placeholder="Digite seu nome de usuário"
            />
          </div>
        )}

        {mode !== MODE.EMAIL_VERIFICATION && (
          <div className="flex flex-col">
            <label className="text-sm">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ring-1 ring-gray-300 rounded p-2"
              placeholder="Digite seu e-mail"
            />
          </div>
        )}

        {mode === MODE.EMAIL_VERIFICATION && (
          <div className="flex flex-col">
            <label className="text-sm">Verification Code</label>
            <input
              type="text"
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              className="ring-1 ring-gray-300 rounded p-2"
              placeholder="Digite o código de verificação"
            />
          </div>
        )}

        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <div className="flex flex-col">
            <label className="text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ring-1 ring-gray-300 rounded p-2"
              placeholder="Digite sua senha"
            />
          </div>
        )}

        {mode === MODE.LOGIN && (
          <div
            className="text-sm text-blue-500 cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Esqueceu sua senha?
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Carregando..." : mode === MODE.LOGIN ? "Login" : "Submit"}
        </button>

        {error && <div className="text-red-500">{error}</div>}
        {message && <div className="text-green-500">{message}</div>}

        {mode === MODE.LOGIN && (
          <div
            className="text-sm text-pink-500 cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            Não tem uma conta? Registre-se.
          </div>
        )}

        {mode === MODE.REGISTER && (
          <div
            className="text-sm text-pink-500 cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Já tem uma conta? Faça login.
          </div>
        )}

        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm text-pink-500 cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Voltar para login.
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
