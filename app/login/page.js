import React from "react";
import Link from "next/link";

export default function home() {
    return (
        <>
        <nav className="flex gap-4">
                <Link href="/" className="hover:underline">
                Home
                </Link>
        </nav>
            <div className="bg-animated-gradient min-h-screen flex items-center justify-center bg-gray-100">
                <form className="bg-white p-8 rounded shadow w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                    <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                    />

                    <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border border-gray-300 p-2 rounded mb-6"
                    />

                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                    Iniciar Sesión
                    </button>
                </form>
            </div>
        </>
    );
}