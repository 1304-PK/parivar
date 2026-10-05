import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      {/* Hero */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.08]">
        Try on clothes
        <br />
        with AI.
      </h1>

      <p className="mt-6 max-w-lg text-lg text-zinc-500 leading-relaxed">
        Upload a photo and a clothing image, then let AI create a realistic
        virtual try-on.
      </p>

      <Link
        to="/try-on"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
      >
        Get Started
      </Link>
    </main>
  );
}
