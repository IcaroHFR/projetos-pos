'use client';

import { createAuthClient } from "better-auth/react";
import { useState } from "react";

type Props = {
  userName?: string;
  userEmail?: string;
};

const createBrowserAuthClient = () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return createAuthClient({ baseURL: `${origin}/api/auth` });
};

const authClient = createBrowserAuthClient();

export default function AuthControl({ userName, userEmail }: Props) {
  const [loading, setLoading] = useState(false);
  const isLogged = Boolean(userEmail || userName);
  const userLabel = userEmail ?? userName;

  const signIn = async () => {
    setLoading(true);
    try {
      const data = (await authClient.signIn.social({ provider: "github", callbackURL: "/" })) as any;
      const redirect = data?.redirectUrl ?? data?.url;
      if (redirect) {
        window.location.href = redirect;
      } else {
        console.error("GitHub sign-in did not return a redirect URL", data);
        alert("Erro: Credenciais do GitHub não configuradas. Configure GITHUB_CLIENT_ID e GITHUB_CLIENT_SECRET no arquivo .env");
        window.location.reload();
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Erro no login com GitHub. Verifique as credenciais no console.");
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-8 shadow-glow backdrop-blur-md max-w-lg w-full">
      <div className="mb-6 text-sm uppercase tracking-[0.24em] text-sky-300/90">Demo de login GitHub</div>
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">Hello World</h1>
      <p className="mt-4 text-slate-300">
        {isLogged ? `Logado como ${userLabel}` : "Você não está logado."}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        {isLogged ? (
          <button
            type="button"
            onClick={signOut}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Saindo..." : "Sair"}
          </button>
        ) : (
          <button
            type="button"
            onClick={signIn}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 0-.287-.01-1.044-.015-2.05-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.76-1.605-2.665-.303-5.467-1.332-5.467-5.933 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.522.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.046.138 3.003.404 2.291-1.552 3.298-1.23 3.298-1.23.655 1.654.244 2.873.12 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.625-5.479 5.922.43.372.814 1.102.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.581C20.565 21.795 24 17.296 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
            {loading ? "Entrando..." : "Entrar com GitHub"}
          </button>
        )}
      </div>
    </div>
  );
}
