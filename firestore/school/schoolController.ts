import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { SchoolDTO } from './SchoolDTO';

const SCHOOL_COLLECTION = 'schools';

export const addSchool = async (school: SchoolDTO): Promise<void> => {
  await addDoc(collection(firestore, SCHOOL_COLLECTION), school);
};

export const getSchools = async (): Promise<SchoolDTO[]> => {
  const snapshot = await getDocs(collection(firestore, SCHOOL_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SchoolDTO));
};

export const deleteSchool = async (schoolId: string): Promise<void> => {
  await deleteDoc(doc(firestore, SCHOOL_COLLECTION, schoolId));
};