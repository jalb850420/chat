'use client'
import Header from "@/components/Header.jsx";
import { useEffect,useState, useRef } from "react";
import { db } from "@/firebaseConfig";
import { doc, addDoc, collection, onSnapshot, deleteDoc} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ChatPanel } from "@/components/chatPanel.jsx";
import UserList from "@/components/UserList";
import ModalPerfil from "@/components/ModalPerfil.jsx";

export default function chat() {
  // const [usuarios, setUsuarios] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const authUser = useAuth();
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [tooltipUser, setTooltipUser] = useState(null);
  const tooltipRef = useRef(null);
  const [tooltipRect, setTooltipRect] = useState(null);
  const [modalUser, setModalUser] = useState(null);


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
      const res = await fetch("https://randomuser.me/api/?results=14");
      const data = await res.json();
      setRandomUsers(data.results);
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 15000); 

    return () => clearInterval(interval);
  }, []);

  const startConversation = async (usuario) => {
    const conversation = {
      messages: [],
      user: usuario,
    };
    const docRef = await addDoc(collection(db, "chats"), conversation);
    setSelectedChat({ id: docRef.id, ...conversation });
    // router.push("/chat"); // O solo actualizar selectedChat
  };  

  useEffect(() => {
    if (tooltipUser && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setTooltipRect(rect);
    }
  }, [tooltipUser]);

  const deleteChat = async (chatId) => {
    try {
      await deleteDoc(doc(db, "chats", chatId));
      setChats((prevChats) => prevChats.filter((c) => c.id !== chatId));
      if (selectedChat?.id === chatId) {
        setSelectedChat(null);
      }
    } catch (error) {
      console.error("Error eliminando chat:", error);
    }
  };
  
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header global */}
      <Header />
      {/* Contenido debajo del Header */}
      <div className="flex flex-1">
        {/* Columna izquierda - Contactos */}
        <aside className="w-1/4 bg-gray-100 p-4 border-r">
          <h2 className="font-bold text-lg mb-4">Conversaciones</h2>
          <ul className="space-y-2 max-h-[76vh] overflow-y-auto">
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`group p-2 bg-white rounded shadow cursor-pointer hover:bg-blue-100 flex justify-between items-center ${
                  selectedChat?.id === chat.id ? "bg-blue-100" : ""
                }`}
              >
                {/* Usuario */}
                <div className="flex items-center gap-2">
                  <img
                    src={chat.user.picture.thumbnail}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {chat.user?.name?.first} {chat.user?.name?.last}
                  </span>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-lg transition"
                    title="Eliminar chat"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalUser(chat.user);
                    }}
                    className="text-blue-500 hover:text-blue-700 text-lg transition"
                    title="Ver perfil"
                  >
                    👤
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </aside>



        {/* Columna central - Conversación */}
        <main className="flex-1 p-4 bg-gray-300 flex flex-col">
          {selectedChat ? (
            <ChatPanel selectedChat={selectedChat} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-black">
              Selecciona una conversación para comenzar
            </div>
          )}
        </main>



        {/* Columna derecha - Usuarios activos */}
        <UserList users={randomUsers} startConversation={startConversation} />
      </div>

      {modalUser && (
        <ModalPerfil user={modalUser} onClose={() => setModalUser(null)} />
      )}
    </div>
  );
}