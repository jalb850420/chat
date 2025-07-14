"use client"
import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-animated-gradient text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">Mi Chat App</h1>
            <nav className="flex gap-4">
                <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
                <Link href="/login" className="hover:text-yellow-300 transition">Login</Link>
                <Link href="/login" className="hover:text-yellow-300 transition">Logout</Link>
            </nav>
        </header>
    );
}