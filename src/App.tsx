import { BrainCircuit } from 'lucide-react';
import GooeyButton from './components/GooeyButton';
import GooeyFilter from './components/GooeyFilter';
import Navigation from './components/Navigation';
import AutomationCards from './components/AutomationCards';
import './styles/navigation.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <GooeyFilter />
      
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">effichat</span>
          </div>
          <Navigation />
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Transform Your Business with AI Automation
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Tools that not only streamline digital tasks and save you time but also increase SALES.
            </p>
          </div>

          <GooeyButton>Get Started Today</GooeyButton>

          <div className="mt-24 w-full">
            <AutomationCards />
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} effichat. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;