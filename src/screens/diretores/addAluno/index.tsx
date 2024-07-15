import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getYears } from '../../../../firestore/year/yearController';
import { addAluno } from '../../../../firestore/aluno/alunoController';
import { YearDTO } from '../../../../firestore/year/YearDTO';
import { AlunoDTO } from '../../../../firestore/aluno/alunoDTO';

const AdicionarAluno = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [emailResponsavel, setEmailResponsavel] = useState('');
  const [telefone, setTelefone] = useState('');
  const [years, setYears] = useState<YearDTO[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    const fetchedYears = await getYears();
    fetchedYears.sort((a, b) => a.year - b.year); // Ordenar os anos em ordem crescente
    setYears(fetchedYears);
  };

  const handleAddAluno = async () => {
    const newAluno: AlunoDTO = {
      nome,
      dataNascimento,
      nomeResponsavel,
      emailResponsavel,
      telefone,
      anoEscolar: selectedYear!,
      turma: selectedClass!,
    };

    await addAluno(newAluno);
    navigation.goBack();
  };

  const renderYear = (year: YearDTO) => (
    <View key={year.id} style={styles.yearContainer}>
      <TouchableOpacity
        style={styles.yearButton}
        onPress={() => setSelectedYear(year.id!)}
      >
        <Text style={styles.yearText}>{year.year}º</Text>
        <Icon name={selectedYear === year.id ? 'expand-less' : 'expand-more'} />
      </TouchableOpacity>
      {selectedYear === year.id && (
        <View style={styles.classesContainer}>
          {year.classes.map((className, index) => (
            <View key={index} style={styles.classSwitchContainer}>
              <Text style={styles.classText}>{className}</Text>
              <Switch
                value={selectedClass === className}
                onValueChange={() => setSelectedClass(className)}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" type="material" color="#28a745" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Adicionar Aluno</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />
          <TextInput
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChangeText={setDataNascimento}
            style={styles.input}
          />
          <TextInput
            placeholder="Nome do Responsável"
            value={nomeResponsavel}
            onChangeText={setNomeResponsavel}
            style={styles.input}
          />
          <TextInput
            placeholder="E-mail do Responsável"
            value={emailResponsavel}
            onChangeText={setEmailResponsavel}
            style={styles.input}
          />
          <TextInput
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
          />
        </View>
        <Text style={styles.sectionTitle}>Selecione o Ano Escolar e Turma:</Text>
        {years.map(renderYear)}
        <Button
          title="Adicionar Aluno"
          onPress={handleAddAluno}
          buttonStyle={styles.button}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    marginLeft: 10,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  classSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  button: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#28a745',
  },
});

export default AdicionarAluno;