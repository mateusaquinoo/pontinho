import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getYears } from '../../../../firestore/year/yearController';
import { YearDTO } from '../../../../firestore/year/YearDTO';
import { getAlunos } from '../../../../firestore/aluno/alunoController';
import { AlunoDTO } from '../../../../firestore/aluno/alunoDTO';

const AlunosDiretor = () => {
  const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
  const [years, setYears] = useState<YearDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAlunos();
    fetchYears();
  }, []);

  const fetchAlunos = async () => {
    try {
      const fetchedAlunos = await getAlunos();
      setAlunos(fetchedAlunos);
    } catch (error) {
      console.error('Error fetching alunos:', error);
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

  const getYearName = (yearId: string) => {
    const year = years.find(y => y.id === yearId);
    return year ? `${year.year}º Ano` : yearId;
  };

  const renderAluno = (aluno: AlunoDTO) => (
    <View key={aluno.id} style={styles.alunoContainer}>
      <TouchableOpacity
        style={styles.alunoButton}
        onPress={() => navigation.navigate('DetalhesAluno', { aluno })}
      >
        <Text style={styles.alunoName}>{aluno.nome}</Text>
        <Icon name="chevron-right" type="material" color="#28a745" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" type="material" color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Alunos</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AdicionarAluno')}>
            <Icon name="add" type="material" color="#fff" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color="#28a745" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {alunos.map(renderAluno)}
          </ScrollView>
        )}
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
  alunoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  alunoButton: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alunoName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AlunosDiretor;