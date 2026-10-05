import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="h-[100svh] md:h-auto md:min-h-screen bg-warm-cream flex flex-col md:flex-row font-sans relative overflow-hidden">
      
      {/* ── DESKTOP IMAGE BACKGROUND ── */}
      <div className="hidden md:block absolute top-0 right-0 w-[65%] h-full z-0">
        <img 
          src="/assets/dummy-desktop-fashion.jpg" 
          alt="Fashion Collection" 
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]" 
        />
      </div>

      {/* ── DESKTOP ORGANIC MASK (Left Side) ── */}
      <div className="hidden md:block absolute top-0 left-0 w-[55%] h-full pointer-events-none z-10">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-full fill-warm-cream"
        >
          {/* Smooth organic curve over the image */}
          <path d="M0,0 L100,0 C85,25 95,75 100,100 L0,100 Z" />
        </svg>
      </div>

      {/* ── MOBILE BACKGROUND SHAPES ── */}
      <div className="md:hidden absolute top-0 left-0 w-full h-full pointer-events-none z-0 flex flex-col justify-between">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-[55%] fill-cream"
        >
          <path d="M0,0 L100,0 L100,80 C70,110 30,70 0,100 Z" />
        </svg>
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-[30%] fill-cream"
        >
          <path d="M0,100 L100,100 L100,30 C70,-10 30,40 0,0 Z" />
        </svg>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="relative z-20 flex flex-col items-center md:items-start text-center md:text-left justify-start md:justify-center w-full md:w-[45%] px-6 pt-10 md:pt-0 pb-4 md:pb-6 md:px-16 lg:px-24 shrink-0">
        
        {/* Brand Hanger Mark */}
        <div className="mb-4 md:mb-12 text-brown w-16 md:w-24 shrink-0">
          <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-auto">
            {/* Elegant Hanger */}
            <path d="M32 8 C30 8 28 9.5 28 11.5 C28 13.5 30 15 32 15 C33.5 15 35 14 35 12" />
            <path d="M32 15 L32 20 M12 36 L32 20 L52 36 Z" />
            {/* Minimal Leaves */}
            <path d="M46 22 C48 18 54 18 54 18 C54 18 54 24 50 28 Z" />
            <path d="M44 26 C46 24 50 25 50 25 C50 25 49 29 47 31 Z" />
            <path d="M52 24 C55 22 58 24 58 24 C58 24 56 28 53 28 Z" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] text-brown leading-[1.05] tracking-tight mb-3 md:mb-5 shrink-0">
          Your Style,<br />Our Story
        </h1>

        {/* Description */}
        <p className="font-sans text-soft-brown text-base md:text-xl max-w-[280px] md:max-w-md mb-4 md:mb-14 shrink-0">
          Trendy essentials for your<br className="md:hidden" /> everyday moments.
        </p>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/try-on"
            className="inline-flex items-center justify-center rounded-full bg-caramel hover:bg-brown text-white-warm px-10 py-4 text-lg font-medium transition-all duration-300 ease-out shadow-sm hover:-translate-y-0.5"
          >
            Get Started &rarr;
          </Link>
        </div>
      </div>

      {/* ── MOBILE IMAGE AREA ── */}
      <div className="md:hidden relative z-10 w-full flex-grow flex flex-col px-4 min-h-0">
        {/* Mobile Image Container */}
        <div className="relative w-full flex-grow min-h-0 rounded-[2rem] overflow-hidden shadow-sm border-[6px] border-warm-cream/50">
          <img 
            src="/assets/dummy-mobile-fashion.jpg" 
            alt="Fashion Collection" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
          />
        </div>
      </div>

      {/* ── MOBILE CTA AREA ── */}
      <div className="md:hidden relative z-20 w-full px-6 py-6 flex justify-center items-center shrink-0">
        <Link
          to="/try-on"
          className="inline-flex items-center justify-center rounded-full bg-caramel hover:bg-brown text-white-warm px-12 py-4 text-lg font-medium transition-all duration-300 ease-out w-full max-w-[16rem] shadow-md hover:-translate-y-0.5"
        >
          Get Started &rarr;
        </Link>
      </div>

    </div>
  );
}
