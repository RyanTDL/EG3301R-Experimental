import { useState } from 'react';

export default function LedControl() {
  const [status, setStatus] = useState('');

  const handleLedToggle = async (ledNumber) => {
    try {
      const response = await fetch('/api/led-control', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ led: ledNumber }), 
      });
      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">LED Control</h1>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => handleLedToggle(1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Toggle LED 1
        </button>

        <button
          onClick={() => handleLedToggle(2)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Toggle LED 2
        </button>

        <button
          onClick={() => handleLedToggle(3)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Toggle LED 3
        </button>
      </div>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
