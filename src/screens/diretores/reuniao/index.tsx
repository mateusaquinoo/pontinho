import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modalize } from 'react-native-modalize';

const meetingData: any = {
  "pais": [
    { date: "2024-01-15", points: "Discussão sobre desempenho e comportamento.", participants: "Pai/Mãe do aluno João" },
    { date: "2024-02-10", points: "Orientações sobre atividades escolares.", participants: "Pai/Mãe do aluno Maria" },
  ],
  "diretor": [
    { date: "2024-01-20", points: "Planejamento do semestre.", participants: "Diretor" },
    { date: "2024-03-05", points: "Revisão das metas anuais.", participants: "Diretor" },
  ],
  "conselho": [
    { date: "2024-02-25", points: "Avaliação do desempenho das turmas.", participants: "Conselho de Classe" },
    { date: "2024-04-10", points: "Planejamento das próximas atividades.", participants: "Conselho de Classe" },
  ],
};

const meetingTypes = [
  { label: "Reunião com Pais", value: "pais" },
  { label: "Reunião com Diretor", value: "diretor" },
  { label: "Conselho de Classe", value: "conselho" },
];

const Reuniao = () => {
  const navigation = useNavigation();

  const [selectedMeetingType, setSelectedMeetingType] = useState<any>(null);
  const [meetings, setMeetings] = useState<any[]>([]);
  const modalizeRef = useRef<Modalize>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState({ date: '', points: '', participants: '' });
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleMeetingTypeChange = (value: any) => {
    setSelectedMeetingType(value);
    setMeetings(meetingData[value] || []);
  };

  const handleAddMeeting = () => {
    setIsEditing(false);
    setCurrentMeeting({ date: '', points: '', participants: '' });
    modalizeRef.current?.open();
  };

  const handleEditMeeting = (index: any) => {
    setIsEditing(true);
    setCurrentMeeting(meetings[index]);
    setSelectedIndex(index);
    modalizeRef.current?.open();
  };

  const saveMeeting = () => {
    let updatedMeetings: any;
    if (isEditing) {
      updatedMeetings = meetings.map((meeting, index) =>
        index === selectedIndex ? currentMeeting : meeting
      );
    } else {
      updatedMeetings = [...meetings, currentMeeting];
    }
    setMeetings(updatedMeetings);
    meetingData[selectedMeetingType] = updatedMeetings; // Simula a atualização do banco de dados
    modalizeRef.current?.close();
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reuniões</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={handleMeetingTypeChange}
            items={meetingTypes}
            placeholder={{ label: "Selecione o tipo de reunião", value: null }}
            style={pickerSelectStyles}
            Icon={() => <Ionicons style={styles.pickerIcon} name="chevron-down" size={24} color="gray" />}
          />
        </View>

        {selectedMeetingType && (
          <>
            {selectedMeetingType === 'pais' && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddMeeting}
              >
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            )}
            <FlatList
              data={meetings}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => selectedMeetingType === 'pais' && handleEditMeeting(index)}
                >
                  <View style={styles.meetingContainer}>
                    <Text style={styles.meetingDate}>Data: <Text style={styles.meetingDateSpan}>{item.date}</Text></Text>
                    <View style={styles.meetingInfo}>
                      <Text style={styles.meetingPoints}>Pontos discutidos: <Text style={styles.meetingSpan}>{item.points}</Text></Text>
                      <Text style={styles.meetingParticipants}>Participantes: <Text style={styles.meetingSpan}>{item.participants}</Text></Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        )}

        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          overlayStyle={styles.modalOverlay}
          modalStyle={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={styles.headModal}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => modalizeRef.current?.close()}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{isEditing ? 'Editar Reunião' : 'Adicionar Reunião'}</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Data"
              value={currentMeeting.date}
              onChangeText={(text) => setCurrentMeeting({ ...currentMeeting, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Pontos discutidos"
              value={currentMeeting.points}
              onChangeText={(text) => setCurrentMeeting({ ...currentMeeting, points: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Participantes"
              value={currentMeeting.participants}
              onChangeText={(text) => setCurrentMeeting({ ...currentMeeting, participants: text })}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={saveMeeting}
            >
              <Text style={styles.submitButtonText}>{isEditing ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
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
  header: {
    backgroundColor: '#28a745',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    zIndex: 10,
    right: 20,
    bottom: 20,
    backgroundColor: "#28a745",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 2,
  },
  meetingContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 2,
  },
  meetingDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 14,
  },
  meetingDateSpan: {
    color: "#28a745",
  },
  meetingInfo: {
    backgroundColor: "#d8d8d8",
    borderRadius: 5,
    padding: 15,
  },
  meetingSpan: {
    fontWeight: "300",
  },
  meetingPoints: {
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
    fontWeight: "600",
  },
  meetingParticipants: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modal: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  headModal: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: "#000"
  },
  input: {
    borderBottomWidth: 3,
    borderBottomColor: "#28a745",
    backgroundColor: "#f0f0f0",
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  submitButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#28a745",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  pickerIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    width: '100%',
    borderBottomColor: "#28a745",
    borderBottomWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    width: '100%',
    borderBottomColor: "#28a745",
    borderBottomWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});

export default Reuniao;