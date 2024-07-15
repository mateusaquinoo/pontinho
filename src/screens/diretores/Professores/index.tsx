import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfessorDTO } from '../../../../firestore/professor/professorDTO';
import { deleteProfessor, getProfessors } from '../../../../firestore/professor/professorController';
import { getYears } from '../../../../firestore/year/yearController';
import { YearDTO } from '../../../../firestore/year/YearDTO';

const Professores = () => {
  const [professors, setProfessors] = useState<ProfessorDTO[]>([]);
  const [years, setYears] = useState<YearDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProfessors();
    fetchYears();
  }, []);

  const fetchProfessors = async () => {
    try {
      setLoading(true);
      const fetchedProfessors = await getProfessors();
      setProfessors(fetchedProfessors);
    } catch (error) {
      console.error('Error fetching professors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchYears = async () => {
    try {
      const fetchedYears = await getYears();
      setYears(fetchedYears);
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  };

  const handleDeleteProfessor = async (professorId: string) => {
    try {
      await deleteProfessor(professorId);
      fetchProfessors();
    } catch (error) {
      console.error('Error deleting professor:', error);
    }
  };

  const handlePressProfessor = (professor: ProfessorDTO) => {
    navigation.navigate('DetalhesProfessor', { professor });
  };

  const renderProfessor = (professor: ProfessorDTO) => (
    <TouchableOpacity key={professor.id} style={styles.professorContainer} onPress={() => handlePressProfessor(professor)}>
      <View style={styles.professorButton}>
        <Text style={styles.professorName}>{professor.name}</Text>
        <Icon name='arrow-forward' />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Professores</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AdicionarProfessor')}>
          <Icon name="add" type="material" color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#28a745" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {professors.map(renderProfessor)}
        </ScrollView>
      )}
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
  professorContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  professorButton: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  professorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Professores;