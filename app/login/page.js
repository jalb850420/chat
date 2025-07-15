'use client'
import React from "react";
import Link from "next/link";
import { auth } from "@/firebaseConfig";
import { useRouter} from "next/navigation";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


const login = () => {

    const router = useRouter();

    const loginHandler = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log(auth);
      router.push("/");
    };
  
    // const logout = async () => {
    //   await signOut(auth);
    //   console.log(auth);
    //   router.push("/login");
    // };
  
    return (
        <>
        <nav className="flex gap-4">
                {/* <Link href="/" className="hover:underline">
                Home
                </Link> */}
        </nav>
            <div className="bg-animated-gradient min-h-screen flex items-center justify-center bg-gray-100">
                <form className="bg-white p-8 rounded shadow w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-6 text-center text-black">Login</h1>

                    <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full border border-gray-300 p-2 rounded mb-4 placeholder-gray-500 text-black"
                    />

                    <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border border-gray-300 p-2 rounded mb-6 placeholder-gray-500 text-black"
                    />

                    <div  className="space-y-4">
                        <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                        Iniciar Sesión
                        </button>

                        <button
                        type="button"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        onClick={() => loginHandler()}
                        >
                        Iniciar Sesión Con Google
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default login;