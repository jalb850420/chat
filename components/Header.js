"use client"
import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header>
            <h1 className="text-xl font-bold">Mi Chat App</h1>
            <nav className="flex gap-4">
                <Link href="/" className="hover:underline">
                Home
                </Link>
                <Link href="/login" className="hover:underline">
                Login
                </Link>
            </nav>
        </header>
    );
}