import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  return (
    <section className={`relative isolate overflow-hidden bg-gray-900 ${className}`}>
      {/* Background image */}
      <img
        src="/assets/hero.jpg"
        alt="Restaurant hero"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center md:object-[center_top]"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      {/* Main content */}
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center sm:px-6 lg:px-8">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-4xl font-bold tracking-tight text-white drop-shadow md:text-6xl"
        >
          Experiență culinară de neuitat
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl"
        >
          Rezervă o masă și bucură‑te de preparate gourmet într‑un ambient elegant.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/reservation"
            className="inline-block rounded-2xl bg-primary-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-black/30 ring-1 ring-primary-400/30 transition hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
          >
            Rezervă acum
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient to improve contrast on bright images */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
