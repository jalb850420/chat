'use client'
import { Card } from "@/components/Card";
import Header from "@/components/Header";
import { useEffect,useState } from "react";
import { db } from "@/firebaseConfig";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ChatPanel } from "@/components/chatPanel";

export default function chat() {
  // const [usuarios, setUsuarios] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const authUser = useAuth();
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  //validacion de autenticacion
  useEffect(() => {
    console.log(authUser);
    if (authUser === null) router.push("/login")
  }, [authUser]);

  //validacion chats activos
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      const chatsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatsData);
      console.log(chatsData);
    });
    
    // Cleanup para evitar fugas de memoria
    return () => unsubscribe();
  }, []);


  // columna derecha para mostrar usuarios disponibles
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://randomuser.me/api/?results=10");
      const data = await res.json();
      setRandomUsers(data.results);
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 15000); 

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen flex flex-col">
      {/* Header global */}
      <Header />

      {/* Contenido debajo del Header */}
      <div className="flex flex-1">
        {/* Columna izquierda - Contactos */}
        {/* <aside className="w-1/4 bg-gray-100 p-4 border-r">
          <h2 className="font-bold text-lg mb-4">Conversaciones</h2>
          <ul className="space-y-2">
            <li className="p-2 bg-white rounded shadow">Usuario 1</li>
          </ul>
        </aside> */}
        <aside className="w-1/4 bg-gray-100 p-4 border-r">
          <h2 className="font-bold text-lg mb-4">Conversaciones</h2>
          <ul className="space-y-2">
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-2 bg-white rounded shadow cursor-pointer hover:bg-blue-100 ${
                  selectedChat?.id === chat.id ? "bg-blue-100" : ""
                }`}
                // className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200 transition"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={chat.user.picture.thumbnail}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {/* {chat.user?.name?.first} {chat.user?.name?.last} */}
                    {chat.user?.name?.first} {chat.user?.name?.last}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>


        {/* Columna central - Conversación */}
        <main className="flex-1 p-4 flex flex-col">
          {selectedChat ? (
            <ChatPanel selectedChat={selectedChat} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Selecciona una conversación para comenzar
            </div>
          )}
        </main>

        {/* Columna derecha - Usuarios activos */}
        <aside className="w-1/4 bg-gray-100 p-4 border-l">
          <h2 className="font-bold text-lg mb-4">Usuarios disponibles</h2>
          <ul className="space-y-2 max-h-[76vh] overflow-y-auto" >
            
            {randomUsers.map((usuario) => (
              <li key={usuario.login.uuid} className="flex p-2 items-center gap-2 bg-white rounded shadow"> 
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <div>
               <img src={usuario.picture.medium} 
                  alt="User small"
                  className="rounded-full w-8 h-8 object-cover group-hover:opacity-0 transition duration-300"
                />
              </div>
              <div>
                <p className="text-xs p-2 gap-2">{usuario.name.first} {usuario.name.last} - {usuario.location.country}</p>
              </div> 
            </li>
            ))}


            {/* <li className="p-2 bg-white rounded shadow">Usuario A</li>
            <li className="p-2 bg-white rounded shadow">Usuario B</li> */}
          </ul>
        </aside>
      </div>
    </div>
  );
}

















{/* Columna central - Conversación */}
{/* <main className="flex-1 p-4 flex flex-col justify-between"> */}
{/* Header del chat */}
{/* <div className="flex items-center justify-between border-b pb-2 mb-4">
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    <span className="font-semibold">Usuario</span>
  </div>
  <button className="text-blue-600 hover:underline">Perfil</button>
</div> */}

{/* Mensajes */}
{/* <div className="flex-1 overflow-y-auto space-y-4 mb-4"> */}
  {/* Mensaje recibido */}
  {/* <div className="flex items-start gap-2">
    <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full text-xs font-bold">
      R
    </div>
    <div className="bg-gray-200 p-3 rounded-2xl max-w-xs">
      <p className="text-sm">¡Hola! ¿Cómo estás?</p>
    </div>
  </div> */}

  {/* Mensaje enviado */}
  {/* <div className="flex items-start justify-end gap-2">
    <div className="bg-blue-600 text-white p-3 rounded-2xl max-w-xs">
      <p className="text-sm">Todo bien, ¿y tú?</p>
    </div>
    <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-xs font-bold">
      T
    </div>
  </div>
</div> */}

{/* Input para escribir */}
{/* <form className="flex gap-2">
  <input
    type="text"
    placeholder="Escribe un mensaje..."
    className="flex-1 border p-2 rounded"
  />
  <button
    type="submit"
    className="bg-blue-600 text-white px-4 rounded"
  >
    Enviar
  </button>
</form>
</main> */}
