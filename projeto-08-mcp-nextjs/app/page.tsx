import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AuthControl from "@/app/components/AuthControl";

export default async function Home() {
  const session = await auth.api.getSession({ headers: headers() });
  const userName = session?.user?.name ?? undefined;
  const userEmail = session?.user?.email ?? undefined;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-3xl rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-8 shadow-glow backdrop-blur-xl">
        <div className="mb-8 space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">Next.js + Better Auth + SQLite</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">Demo de autenticação</h1>
          <p className="max-w-2xl text-slate-300 sm:text-lg">
            Um projeto simples com login via GitHub, sessão persistida em SQLite e app router do Next.js.
          </p>
        </div>

        <AuthControl userName={userName} userEmail={userEmail} />
      </div>
    </main>
  );
}
