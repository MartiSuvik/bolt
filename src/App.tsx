import { ServicesSection } from '@/components/services/ServicesSection';
import { Benefits } from '@/components/Benefits';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,0,128,0.1),transparent_50%)]" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <header className="h-screen flex items-center justify-center animate-fade-in">
          <div className="text-center space-y-6 max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">
              Automate Your Success
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Transform your business with intelligent automation solutions
            </p>
          </div>
        </header>

        {/* Benefits Section */}
        <Benefits />

        {/* Services Section */}
        <ServicesSection />
      </div>
    </div>
  );
}