// Full-screen loader: the shop seal breathing over an amber glow.
// Used by HomePage while categories are loading.
export function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center animate-loader-bg-glow">
      <div className="text-center">
        <img
          src="/logo.webp"
          alt=""
          aria-hidden="true"
          width={512}
          height={512}
          className="animate-sun-disc-breathe h-56 w-56 mx-auto object-contain drop-shadow-[0_0_40px_rgba(251,191,36,0.55)]"
        />
        <p className="mt-6 text-sm font-medium text-amber-900/70 tracking-wider uppercase">
          19 Khari Baoli
        </p>
      </div>
    </div>
  );
}
