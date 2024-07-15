// firestore/aviso/avisoController.ts
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AvisoDTO } from './avisDTO';

const firestore = getFirestore();
const avisosCollection = collection(firestore, 'avisos');

export const addAviso = async (aviso: AvisoDTO) => {
  const docRef = await addDoc(avisosCollection, aviso);
  return docRef.id;
};

export const getAvisos = async (): Promise<AvisoDTO[]> => {
  const snapshot = await getDocs(avisosCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AvisoDTO));
};

export const deleteAviso = async (avisoId: string) => {
  await deleteDoc(doc(avisosCollection, avisoId));
};