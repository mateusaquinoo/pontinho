import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const studentData: { [key: string]: { grades: { N1: number; N2: number }; attendance: { presences: number; absences: number }; tasks: { completed: number; notCompleted: number; passed?: number } } } = {
  alice: {
    grades: { N1: 8.5, N2: 9.0 },
    attendance: { presences: 20, absences: 2 },
    tasks: { completed: 15, notCompleted: 5, passed: 20 },
  },
  bob: {
    grades: { N1: 7.0, N2: 8.0 },
    attendance: { presences: 18, absences: 4 },
    tasks: { completed: 12, notCompleted: 8 },
  },
  charlie: {
    grades: { N1: 6.0, N2: 7.5 },
    attendance: { presences: 22, absences: 0 },
    tasks: { completed: 20, notCompleted: 0 },
  },
};

export default function Alunoturma() {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(false);
  const [expandedTwo, setExpandedTwo] = useState(false);
  const [expandedThree, setExpandedThree] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{ label: string, value: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [students, setStudents] = useState([
    { label: 'Alice', value: 'alice' },
    { label: 'Bob', value: 'bob' },
    { label: 'Charlie', value: 'charlie' },
  ]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleExpandTwo = () => {
    setExpandedTwo(!expandedTwo);
  };

  const toggleExpandThree = () => {
    setExpandedThree(!expandedThree);
  };

  const filteredStudents = students.filter(student =>
    student.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStudent = (student: any) => {
    setSelectedStudent(student);
    setModalVisible(false);
    setSearchQuery(student.label);
  };

  const renderStudentInfo = () => {
    if (!selectedStudent) return null;

    const { grades, attendance, tasks } = studentData[selectedStudent.value] || {};

    return (
      <ScrollView style={styles.infoContainer}>
        <View>
          <Pressable onPress={toggleExpand} style={[styles.infoBox, expanded && styles.infoBoxExpanded]}>
            <Text style={styles.infoTitle}>Tarefas</Text>
            <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} />
          </Pressable>
          {expanded && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
              <View style={styles.info}>
                <Text style={styles.infoText}>Realizadas: </Text>
                <Text style={styles.infoTextSpanPositive}>{tasks?.completed ?? '-'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Não Realizadas: </Text>
                <Text style={styles.infoTextSpanNegative}>{tasks?.notCompleted ?? '-'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Totais: </Text>
                <Text style={styles.infoTextSpan}>{tasks?.passed ?? '-'}</Text>
              </View>
            </ScrollView>
          )}
        </View>

        <View>
          <Pressable onPress={toggleExpandTwo} style={[styles.infoBox, expandedTwo && styles.infoBoxExpanded]}>
            <Text style={styles.infoTitle}>Presença</Text>
            <Ionicons name={expandedTwo ? 'chevron-up' : 'chevron-down'} size={20} />
          </Pressable>
          {expandedTwo && (
            <View style={styles.contentInfoBox}>
              <View style={styles.info}>
                <Text style={styles.infoText}>Presenças: </Text>
                <Text style={styles.infoTextSpanPositive}>{attendance?.presences ?? '-'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Faltas: </Text>
                <Text style={styles.infoTextSpanNegative}>{attendance?.absences ?? '-'}</Text>
              </View>
            </View>
          )}
        </View>

        <View>
          <Pressable onPress={toggleExpandThree} style={[styles.infoBox, expandedThree && styles.infoBoxExpanded]}>
            <Text style={styles.infoTitle}>Notas</Text>
            <Ionicons name={expandedThree ? 'chevron-up' : 'chevron-down'} size={20} />
          </Pressable>
          {expandedThree && (
            <View style={styles.contentInfoBox}>
              <View style={styles.info}>
                <Text style={styles.infoText}>N1:</Text>
                <Text style={styles.infoTextSpan}>{grades?.N1 ?? '-'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>N2:</Text>
                <Text style={styles.infoTextSpan}>{grades?.N2 ?? '-'}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.buttonsSmall}>
          <TouchableOpacity style={styles.buttonSmall}>
            <Text style={styles.textButtonSmall}>Indisciplina</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsSmall}>
          <TouchableOpacity style={styles.buttonSmall}>
            <Text style={styles.textButtonSmall}>Agendar reunião com pais</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alunos</Text>
      </View>
 
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="search" size={20} color="#28a745" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar aluno..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onFocus={() => setModalVisible(true)}
        />
      </TouchableOpacity>

      {renderStudentInfo()}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.modalSearchInput}
              placeholder="Buscar aluno..."
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            <FlatList
              data={filteredStudents}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelectStudent(item)}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
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
  box: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#28a745",
    marginTop: 24,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  titleBox: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 4,
    color: "#ffffff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 30,
    width: "100%",
    borderBottomColor: "#28a745",
    borderBottomWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalSearchInput: {
    padding: 10,
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 10,
    width: "100%",
  },
  infoBox: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 5,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#28a745",
    borderBottomWidth: 3,
  },
  infoBoxExpanded: {
    borderBottomWidth: 2,
    borderBottomColor: "#d8d8d8",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  scrollView: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 5,
    flexDirection: "row",
    borderBottomColor: "#28a745",
    borderBottomWidth: 3,
  },
  contentInfoBox: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomColor: "#28a745",
    borderBottomWidth: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  info: {
    backgroundColor: "#dfdfdf",
    padding: 15,
    flex: 1,
    borderRadius: 5,
    marginRight: 10,
    width: 150,
  },
  infoText: {},
  infoTextSpan: {
    marginTop: 8,
    color: "#28a745",
    fontWeight: "700",
    fontSize: 40,
  },
  infoTextSpanPositive: {
    marginTop: 8,
    color: "#10C300",
    fontWeight: "700",
    fontSize: 40,
  },
  infoTextSpanNegative: {
    marginTop: 8,
    color: "#C30000",
    fontWeight: "700",
    fontSize: 40,
  },
  buttonSmall: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderBottomColor: "#C30000",
    borderBottomWidth: 4,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textButtonSmall: {
    fontSize: 16,
    fontWeight: "600",
    width: "100%",
    textAlign: "center",
  },
  buttonsSmall: {
    marginTop: 20,
    gap: 20,
    width: "100%",
  },
});
   