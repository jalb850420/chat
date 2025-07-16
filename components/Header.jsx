"use client"
import React from "react";
import Link from "next/link";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const logoutHandler = async () => {
      try {
        await signOut(auth);
        router.push("/login");  // Redirige al login luego de cerrar sesión
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    return (
        <header className="bg-animated-gradient text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">Mi Chat App</h1>
            <nav className="flex gap-4">
                <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
                <Link href="/chat" className="hover:text-yellow-300 transition">ir a mis chat´s</Link>
                {/* <Link href="/login" className="hover:text-yellow-300 transition">Login</Link> */}
                <Link href="#" className="hover:text-yellow-300 transition" onClick={logoutHandler}>Logout</Link>
            </nav>
        </header>
    );
}