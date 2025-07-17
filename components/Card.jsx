"use client";
import React from "react";

export const Card = ({ usuario, clickHandler }) => {
  const countryCode = usuario.nat?.toLowerCase();
  const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;

  return (
    <article
      onClick={clickHandler}
      className="relative w-72 h-auto bg-gradient-to-tr from-slate-100 to-slate-200 hover:from-silver hover:to-white border border-gray-300 rounded-xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 group"
    >
      {/* Efecto brillante */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer pointer-events-none" />

      <div className="p-4 flex flex-col items-center text-black space-y-3">
        {/* Nombre */}
        <h2 className="text-lg font-semibold text-center">
          {usuario.name.first} {usuario.name.last}
        </h2>

        {/* Imagen con hover */}
        <div className="relative w-24 h-24 group-hover:scale-110 transition-transform duration-500">
          <img
            src={usuario.picture.large}
            alt="Foto perfil"
            className="rounded-full w-full h-full object-cover shadow-md"
          />
        </div>

        {/* Info */}
        <div className="text-sm text-center space-y-1 mt-2">
          <p>📍 {usuario.location.city}, {usuario.location.country}</p>
          <p>🎂 {usuario.dob.age} años</p>

          <div className="flex justify-center items-center gap-2 mt-2">
            <img
              src={flagUrl}
              alt={`Bandera ${usuario.location.country}`}
              className="w-6 h-4 rounded border"
            />
            <span className="text-gray-700">{usuario.nat}</span>
          </div>
        </div>
      </div>
    </article>
  );
};








// <article className="w-60 h-40 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300 p-4 text-black" 
// onClick={clickHandler}>
//     <h2 className="p-2">{usuario.name.first}</h2>
//     <div className="flex">
//         <div className="relative w-32 h-32 group">
//             <img
//                 src={usuario.picture.medium}
//                 alt="User small"
//                 className="rounded-full w-16 h-16 object-cover group-hover:opacity-0 transition duration-300"
//             />
//             <img
//                 src={usuario.picture.large}
//                 alt="User large"
//                 className="absolute top-0 left-0 rounded-full w-32 h-32 object-cover opacity-0 group-hover:opacity-100 transition duration-300"
//             />
//         </div>
//         <section>
//             <h1>{usuario.location.country}</h1>
//             <h2>{usuario.location.city}</h2>
//         </section>
//     </div>
// </article>