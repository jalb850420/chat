"use client";
import React, { useState, useRef, useEffect } from "react";
import UserTooltip from "./UserTooltip";

export default function UserList({ users, startConversation }) {
  const [tooltipUser, setTooltipUser] = useState(null);
  const [tooltipRect, setTooltipRect] = useState(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (tooltipUser && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setTooltipRect(rect);
    } else {
      setTooltipRect(null);
    }
  }, [tooltipUser]);

  return (
    <aside className="w-1/4 bg-gray-100 p-4 border-l">
      <h2 className="font-bold text-lg mb-4 text-black">Usuarios disponibles</h2>
      <ul className="space-y-2 max-h-[90vh] overflow-y-auto">
        {users.map((usuario) => {
          const isActive = tooltipUser?.login.uuid === usuario.login.uuid;

          return (
            <li
              key={usuario.login.uuid}
              onClick={() => setTooltipUser(usuario)}
              ref={isActive ? tooltipRef : null}
              className={`flex p-2 items-center gap-2 bg-white rounded shadow cursor-pointer hover:bg-blue-100 transition`}
            >
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <img
                src={usuario.picture.medium}
                alt="User"
                className="rounded-full w-8 h-8 object-cover"
              />
              <p className="text-xs">{usuario.name.first} {usuario.name.last}</p>
            </li>
          );
        })}
      </ul>

      <UserTooltip
        user={tooltipUser}
        position={tooltipRect}
        onClose={() => setTooltipUser(null)}
        onStartChat={startConversation}
      />
    </aside>
  );
}
