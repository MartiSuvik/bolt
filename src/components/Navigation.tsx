import { useState } from 'react';
import { Home, Info, LayoutGrid, Mail } from 'lucide-react';
import NavButton from './NavButton';
import CircularTextPath from './CircularTextPath';
import ContactForm from './ContactForm';

export default function Navigation() {
  const [showContactForm, setShowContactForm] = useState(false);

  const scrollToServices = () => {
    const servicesSection = document.querySelector('.automation-cards');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <CircularTextPath />
      <nav className="nav-menu">
        <NavButton label="Home" Icon={Home} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        <NavButton label="About" Icon={Info} onClick={() => {}} />
        <NavButton label="Services" Icon={LayoutGrid} onClick={scrollToServices} />
        <NavButton label="Contact" Icon={Mail} onClick={() => setShowContactForm(true)} />
      </nav>

      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-lg">
            <ContactForm onClose={() => setShowContactForm(false)} />
          </div>
        </div>
      )}
    </>
  );
}