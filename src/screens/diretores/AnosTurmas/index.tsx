import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YearDTO } from '../../../../firestore/year/YearDTO';
import { addClassToYear, addYear, deleteYear, getYears } from '../../../../firestore/year/yearController';
import { TextInputMask } from 'react-native-masked-text';
import { TextInput } from 'react-native-gesture-handler';
import alunoturma from '../turmasAlunos';

const AnosTurmasDiretor = () => {
  const [years, setYears] = useState<YearDTO[]>([]);
  const [year, setYear] = useState('');
  const [className, setClassName] = useState('');
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [currentYearId, setCurrentYearId] = useState<string | null>(null);
  const modalizeRef = useRef<Modalize>(null);
  const classModalizeRef = useRef<Modalize>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    const fetchedYears = await getYears();
    // Ordenar os anos em ordem crescente
    fetchedYears.sort((a, b) => a.year - b.year);
    setYears(fetchedYears);
  };

  const handleAddYear = async () => {
    const newYear: YearDTO = {
      year: parseInt(year, 10),
      classes: [],
    };
    await addYear(newYear);
    fetchYears();
    modalizeRef.current?.close();
    clearForm();
  };

  const handleAddClass = async () => {
    if (currentYearId) {
      await addClassToYear(currentYearId, className);
      fetchYears();
      setClassName('');
      classModalizeRef.current?.close();
    }
  };

  const handleDeleteYear = async (yearId: string) => {
    await deleteYear(yearId);
    fetchYears();
  };

  const clearForm = () => {
    setYear('');
    setClassName('');
  };

  const toggleYear = (yearId: string) => {
    setExpandedYear(expandedYear === yearId ? null : yearId);
  };

  const openClassModal = (yearId: string) => {
    setCurrentYearId(yearId);
    classModalizeRef.current?.open();
  };

  const handleClassPress = () => {
    navigation.navigate('alunoturma');
  };

  const renderYear = (year: YearDTO) => (
    <View key={year.id} style={styles.yearContainer}>
      <TouchableOpacity
        style={styles.yearButton}
        onPress={() => toggleYear(year.id!)}
      >
        <Text style={styles.yearText}>{year.year}º</Text>
        <Icon name={expandedYear === year.id ? 'expand-less' : 'expand-more'} />
        <TouchableOpacity style={styles.moreButton} onPress={() => openClassModal(year.id!)}>
          <Icon name="more-vert" type="material" color="#000" />
        </TouchableOpacity>
      </TouchableOpacity>
      {expandedYear === year.id && (
        <View style={styles.classesContainer}>
          {year.classes.map((className, index) => (
            <TouchableOpacity
              key={index}
              style={styles.classButton}
              onPress={() => handleClassPress()}
            >
              <Text style={styles.classText}>{className}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" type="material" color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Anos e Turmas</Text>
          <TouchableOpacity onPress={() => modalizeRef.current?.open()}>
            <Icon name="add" type="material" color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {years.map(renderYear)}
        </ScrollView>

        <Modalize ref={modalizeRef} snapPoint={400}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Olá, adicione o ano escolar</Text>
            <TextInputMask
              type={'only-numbers'}
              placeholder="Ano Escolar"
              value={year}
              onChangeText={setYear}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button title="Adicionar" onPress={handleAddYear} buttonStyle={styles.button} />
          </View>
        </Modalize>

        <Modalize ref={classModalizeRef} snapPoint={400}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Turma</Text>
            <TextInput
              placeholder="Turma"
              value={className}
              onChangeText={setClassName}
              keyboardType="default"
              style={styles.input}
            />
            <Button title="Adicionar Turma" onPress={handleAddClass} buttonStyle={styles.button} />
          </View>
        </Modalize>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#28a745',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    padding: 10,
  },
  yearContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  yearButton: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yearText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  classesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  classButton: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#28a745',
  },
  classText: {
    fontSize: 16,
  },
  moreButton: {
    marginLeft: 10,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#28a745',
  },
});

export default AnosTurmasDiretor;