import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getYearById } from '../../../../firestore/year/yearController';

const DetalhesAluno = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { aluno }: any = route.params;
  const [yearName, setYearName] = useState('');

  useEffect(() => {
    const fetchYearName = async () => {
      if (aluno.anoEscolar) {
        const year = await getYearById(aluno.anoEscolar);
        setYearName(`${year.year}º Ano`);
      }
    };
    fetchYearName();
  }, [aluno.anoEscolar]);

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{aluno.nome} - {yearName} {aluno.turma}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="grade" type="material" color="#28a745" />
          <Text style={styles.optionText}>Notas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Presenca')}>
          <Icon name="toggle-on" type="material" color="#28a745" />
          <Text style={styles.optionText}>Presença</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="assignment" type="material" color="#28a745" />
          <Text style={styles.optionText}>Tarefas de casa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="report-problem" type="material" color="#28a745" />
          <Text style={styles.optionText}>Indisciplinas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#28a745',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#28a745',
  },
});

export default DetalhesAluno;