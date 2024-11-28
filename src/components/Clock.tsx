import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="text-lg font-semibold text-gray-700">
        {date.toLocaleTimeString()}
      </div>
      <div className="text-sm text-gray-500">
        {date.toLocaleDateString()}
      </div>
    </div>
  );
}