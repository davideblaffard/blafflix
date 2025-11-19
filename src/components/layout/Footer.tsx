export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-800 bg-black/80 py-8 text-xs text-neutral-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:justify-between md:px-8">
        <div className="space-y-2">
          <p className="font-semibold text-neutral-300">
            Domande? Contatta il supporto Blafflix (mock).
          </p>
          <div className="flex flex-wrap gap-3">
            <span>Chi siamo</span>
            <span>FAQ</span>
            <span>Termini di utilizzo</span>
            <span>Privacy</span>
          </div>
        </div>
        <p className="text-neutral-600">
          Blafflix · Progetto portfolio · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
