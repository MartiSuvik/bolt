import { useState } from 'react';
import { X } from 'lucide-react';
import ContactForm from './ContactForm';

interface ServiceModalProps {
  service: {
    title: string;
    summary: string;
    possibilities: string[];
    benefits: string[];
    deliveryTime: string;
  };
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white">{service.title}</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Summary</h3>
              <p className="text-gray-300">{service.summary}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Possibilities</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {service.possibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Benefits</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {service.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Estimated Delivery Time</h3>
              <p className="text-gray-300">{service.deliveryTime}</p>
            </div>
            
            {!showContactForm && (
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book a Call & Receive a Video
              </button>
            )}
          </div>
        </div>
        
        {showContactForm && (
          <div className="border-t border-gray-800 mt-4">
            <ContactForm 
              onClose={() => setShowContactForm(false)}
              className="rounded-t-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}