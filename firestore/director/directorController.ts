import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { UserDTO } from '../user/userDTO';

export const createDirectorAccount = async (user: UserDTO) => {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
  // Salvar informações adicionais no Firestore, se necessário
  return userCredential;
};

export const loginDirector = async (email: string, password: string) => {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential;
};