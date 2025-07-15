import React, { useState, useEffect } from "react";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export function useAuth() {
  const [authenticateUser,setAuthenticateUser]= useState();

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, setAuthenticateUser);
    return () => unsubscribe();
  },[]);

  return authenticateUser;
}
