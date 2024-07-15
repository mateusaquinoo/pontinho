import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { AlunoDTO } from './alunoDTO';

const alunosCollection = collection(firestore, 'alunos');

export const addAluno = async (aluno: AlunoDTO) => {
  await addDoc(alunosCollection, aluno);
};

export const getAlunos = async (): Promise<AlunoDTO[]> => {
  const snapshot = await getDocs(alunosCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AlunoDTO));
};

export const deleteAluno = async (id: string) => {
  await deleteDoc(doc(alunosCollection, id));
};