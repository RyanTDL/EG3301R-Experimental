import { useState } from 'react';

export default function LedControl() {
  const [status, setStatus] = useState('');

  const handleLedToggle = async () => {
    try {
      const response = await fetch('/api/led-control', { method: 'POST' });
      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">LED Control</h1>
      <button
        onClick={handleLedToggle}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Toggle LED Blinking
      </button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}