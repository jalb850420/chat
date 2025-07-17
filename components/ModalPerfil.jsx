// components/ModalPerfil.jsx
'use client';
import React from "react";

const ModalPerfil = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div 
className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        >
          ✕
        </button>
        <div className="flex flex-col items-center">
          <img
            src={user.picture.large}
            alt="Profile"
            className="w-28 h-28 rounded-full mb-4"
          />
          <h2 className="text-xl font-bold text-center mb-2">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-gray-600 text-sm mb-1">📧 {user.email}</p>
          <p className="text-gray-600 text-sm mb-1">
            📍 {user.location.city}, {user.location.country}
          </p>
          <p className="text-gray-600 text-sm mb-1">📞 {user.phone}</p>
          <p className="text-gray-600 text-sm">🎂 Edad: {user.dob.age}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalPerfil;
