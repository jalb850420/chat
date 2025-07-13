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
            <h1>Login page . . .</h1>
        </>
    );
}