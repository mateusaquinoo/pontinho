// firestore/years/yearController.ts
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { YearDTO } from './YearDTO';

const firestore = getFirestore();
const yearsCollection = collection(firestore, 'years');

export const addYear = async (year: YearDTO) => {
  const docRef = await addDoc(yearsCollection, year);
  return docRef.id;
};

export const getYears = async (): Promise<YearDTO[]> => {
  const snapshot = await getDocs(yearsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as YearDTO));
};

export const deleteYear = async (yearId: string) => {
  await deleteDoc(doc(yearsCollection, yearId));
};

export const addClassToYear = async (yearId: string, className: string) => {
  const yearDoc = doc(yearsCollection, yearId);
  const yearData = (await getDoc(yearDoc)).data() as YearDTO;
  const updatedClasses = [...yearData.classes, className];
  await updateDoc(yearDoc, { classes: updatedClasses });
};

export const getYearById = async (id: string): Promise<YearDTO> => {
  const yearDoc = await getDoc(doc(yearsCollection, id));
  if (yearDoc.exists()) {
    return { id: yearDoc.id, ...yearDoc.data() } as YearDTO;
  } else {
    throw new Error('Year not found');
  }
};