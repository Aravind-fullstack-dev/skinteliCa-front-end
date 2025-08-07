import React from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-md shadow-lg text-white ${bgColor}`}>
      <div className="flex items-center justify-between space-x-4">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">×</button>
      </div>
    </div>
  );
};

export default Toast;
