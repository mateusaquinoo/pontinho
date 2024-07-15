// firestore/controllers/AuthController.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';

export const createAccount = async (name: string, phone: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    return user;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginWithPhone = async (phone: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, phone + '@ponto-aluno.com', password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Novo método para login de professor
export const loginProfessor = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};