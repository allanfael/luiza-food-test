import { app } from "@/config/firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const firebaseAuth = getAuth(app);

export const firebaseService = {
  register: async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return response;
  },
  login: async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return response;
  },

  logout: async () => {
    await firebaseAuth.signOut();
  },
};