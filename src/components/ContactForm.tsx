import { useState } from 'react';

interface ContactFormProps {
  onClose: () => void;
  className?: string;
}

export default function ContactForm({ onClose, className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className={`bg-gray-900 rounded-lg p-6 shadow-xl ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            What are you trying to achieve with automation?
          </label>
          <textarea
            id="message"
            rows={4}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}