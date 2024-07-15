import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getYears } from '../../../../firestore/year/yearController';
import { addProfessor } from '../../../../firestore/professor/professorController';
import { YearDTO } from '../../../../firestore/year/YearDTO';
import { ProfessorDTO } from '../../../../firestore/professor/professorDTO';

const AdicionarProfessor = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [password, setPassword] = useState(''); // Campo de senha
  const [years, setYears] = useState<YearDTO[]>([]);
  const [selectedYears, setSelectedYears] = useState<{ [key: string]: boolean }>({});
  const [selectedClasses, setSelectedClasses] = useState<{ [key: string]: { [key: string]: boolean } }>({});

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    const fetchedYears = await getYears();
    fetchedYears.sort((a, b) => a.year - b.year); // Ordenar os anos em ordem crescente
    setYears(fetchedYears);
  };

  const handleToggleYear = (yearId: string) => {
    setSelectedYears(prev => ({
      ...prev,
      [yearId]: !prev[yearId],
    }));
    if (!selectedYears[yearId]) {
      setSelectedClasses(prev => ({
        ...prev,
        [yearId]: {},
      }));
    } else {
      setSelectedClasses(prev => {
        const updatedClasses = { ...prev };
        delete updatedClasses[yearId];
        return updatedClasses;
      });
    }
  };

  const handleToggleClass = (yearId: string, className: string) => {
    setSelectedClasses(prev => ({
      ...prev,
      [yearId]: {
        ...prev[yearId],
        [className]: !prev[yearId]?.[className],
      },
    }));
  };

  const handleAddProfessor = async () => {
    const selectedYearIds = Object.keys(selectedYears).filter(yearId => selectedYears[yearId]);
    const selectedClassesByYear = Object.entries(selectedClasses).reduce((acc, [yearId, classes]) => {
      const selectedClassNames = Object.keys(classes).filter(className => classes[className]);
      if (selectedClassNames.length > 0) {
        acc[yearId] = selectedClassNames;
      }
      return acc;
    }, {} as { [key: string]: string[] });

    const newProfessor: ProfessorDTO = {
      name,
      email,
      cpf,
      phone,
      subject,
      password, // Inclui a senha no DTO do professor
      years: selectedYearIds,
      classes: selectedClassesByYear,
    };

    await addProfessor(newProfessor);
    navigation.goBack();
  };

  const renderYear = (year: YearDTO) => (
    <View key={year.id} style={styles.yearContainer}>
      <View style={styles.yearButton}>
        <Text style={styles.yearText}>{year.year}º</Text>
        <Switch
          value={selectedYears[year.id!] || false}
          onValueChange={() => handleToggleYear(year.id!)}
        />
      </View>
      {selectedYears[year.id!] && (
        <View style={styles.classesContainer}>
          {year.classes.map((className, index) => (
            <View key={index} style={styles.classSwitchContainer}>
              <Text style={styles.classText}>{className}</Text>
              <Switch
                value={selectedClasses[year.id!] && selectedClasses[year.id!][className]}
                onValueChange={() => handleToggleClass(year.id!, className)}
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
          <Text style={styles.headerTitle}>Adicionar professor</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            style={styles.input}
          />
          <TextInput
            placeholder="Telefone"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          <TextInput
            placeholder="Matéria"
            value={subject}
            onChangeText={setSubject}
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <Text style={styles.sectionTitle}>Selecione os anos e turmas que esse professor lecionará</Text>
        {years.map(renderYear)}
        <Button
          title="Adicionar professor"
          onPress={handleAddProfessor}
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

export default AdicionarProfessor;