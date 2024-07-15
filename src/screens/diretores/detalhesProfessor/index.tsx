import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Professor = {
  name: string;
  years: {
    [key: string]: string[];
  };
};

type RouteParams = {
  professor: Professor;
};

const DetalhesProfessor = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { professor } = route.params;

  const [showYears, setShowYears] = useState(false);

  const toggleShowYears = () => {
    setShowYears(!showYears);
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{professor.name}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Pontos Batidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Plano de Ensino</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={toggleShowYears}>
          <Icon name="school" type="material" color="#28a745" />
          <Text style={styles.optionText}>Anos Escolares</Text>
          <Icon name={showYears ? 'expand-less' : 'expand-more'} type="material" color="##28a745" />
        </TouchableOpacity>
        {showYears && (
          <View style={styles.yearsContainer}>
            {Object.entries(professor.years).map(([year, classes], index) => (
              <View key={index} style={styles.yearItem}>
                <Text style={styles.yearText}>{year}º Ano:</Text>
                {Array.isArray(classes) && classes.length > 0 ? (
                  classes.map((className, idx) => (
                    <Text key={idx} style={styles.classText}>{className}</Text>
                  ))
                ) : (
                  <Text style={styles.classText}>Nenhuma turma atribuída</Text>
                )}
              </View>
            ))}
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#28a745',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
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
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  yearsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  yearItem: {
    marginBottom: 10,
  },
  yearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  classText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#000',
  },
});

export default DetalhesProfessor;