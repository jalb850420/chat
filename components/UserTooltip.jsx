import React from "react";

export default function UserTooltip({ user, position, onClose, onStartChat }) {
  if (!user || !position) return null;

  return (
    <div
      className="fixed z-50 w-72 p-4 bg-white border rounded shadow-lg text-black"
      style={{
        top: position.bottom + 8,
        left: position.left + position.width / 2 - 144,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Perfil</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-red-500 font-bold hover:text-red-700"
        >
          ✕
        </button>
      </div>
      <div className="flex gap-4 items-center mb-4">
        <img
          src={user.picture.large}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <p className="font-semibold">
            {user.name.first} {user.name.last}
          </p>
          <p className="text-xs text-gray-600">
            {user.location.city}, {user.location.country}
          </p>
          <p className="text-xs text-gray-600">Edad: {user.dob.age}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onStartChat(user);
          onClose();
        }}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Iniciar Chat
      </button>
    </div>
  );
}
