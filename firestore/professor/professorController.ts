import { firestore } from '../../config/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { ProfessorDTO } from './professorDTO';

const professorCollection = collection(firestore, 'professors');

export const addProfessor = async (professor: ProfessorDTO) => {
  await addDoc(professorCollection, professor);
};

export const getProfessors = async (): Promise<ProfessorDTO[]> => {
  const snapshot = await getDocs(professorCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as ProfessorDTO[];
};

export const deleteProfessor = async (professorId: string) => {
  const professorDoc = doc(firestore, 'professors', professorId);
  await deleteDoc(professorDoc);
};