'use client'
import { Card } from "@/components/Card";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [usuarios,setUsuarios] = useState([]);

  useEffect(() => {
    const cargaUsuarios = async () =>{
      const resp = await fetch("https://randomuser.me/api/?results=10");
      const respuesta = await resp.json();
      console.log(respuesta);
      setUsuarios(respuesta.results);
    }

    cargaUsuarios();
  }, []);

  // const startConversation = async (usuario) => {
  //   const conversation = {
  //     messages: [],
  //     user: usuario,
  //   };

  //   await addDoc(collection(db, "chats"), conversation);
  //   Router.push("/chat");
  // };


  return (
    <div className="bg-animated-gradient w-full flex flex-col">
      <Header />
      <h1 className="text-white gap-10 p-4">Hola!, chatea con una persona nueva hoy!</h1>

      <section className="flex flex-wrap justify-center gap-4 px-10 min-h-[78vh] overflow-y-auto">
        {usuarios.map( (usuario) => (
          <Card
            key={usuario.login.uuid}
            usuario={usuario}
            // clickHandler ={() => startConversation(usuario)}
          ></Card>
        ))}
      </section>
    </div>
  );
}
