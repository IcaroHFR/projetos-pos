export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <div className="rounded-3xl border border-slate-700/70 bg-slate-900/90 p-10 text-center shadow-glow">
        <h1 className="text-3xl font-semibold">Página não encontrada</h1>
        <p className="mt-3 text-slate-400">A rota que você tentou acessar não existe.</p>
      </div>
    </main>
  );
}
