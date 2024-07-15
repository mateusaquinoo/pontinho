import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const students = [
  { label: "Alice", value: "alice" },
  { label: "Bob", value: "bob" },
  { label: "Charlie", value: "charlie" },
  // Adicione mais alunos conforme necessário
];

export default function Presenca() {
  const navigation = useNavigation();

  const [attendance, setAttendance] = useState<{ [key: string]: any }>({});

  const handleAttendance = (student: any, type: any) => {
    setAttendance((prevState) => ({
      ...prevState,
      [student.value]: type,
    }));
  };

  const handleSubmit = () => {
    console.log(attendance);
    // Aqui você pode implementar a lógica para enviar os dados de 'attendance' para o servidor ou processá-los conforme necessário
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Presença</Text>
      </View>
      <View style={styles.box}>
 
        <View>
          <Text style={styles.titleBox}>Presença</Text>
          <Text style={styles.subTitleBox}>5º ano - A</Text>
        </View>
      </View>
      <View style={styles.separator}>
        <Text style={styles.separatorText}>Alunos</Text>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <View style={styles.studentContainer}>
            <Text style={styles.studentName}>
              {item.label.split(" ")[0]} {item.label.split(" ")[1]}
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() =>
                  handleAttendance(
                    item,
                    attendance[item.value] === "presente" ? null : "presente"
                  )
                }
              >
                <Ionicons
                  name={
                    attendance[item.value] === "presente"
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={24}
                  color={
                    attendance[item.value] === "presente" ? "#10C300" : "#ccc"
                  }
                />
                <Text style={styles.checkboxLabel}>Presente</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() =>
                  handleAttendance(
                    item,
                    attendance[item.value] === "ausente" ? null : "ausente"
                  )
                }
              >
                <Ionicons
                  name={
                    attendance[item.value] === "ausente"
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={24}
                  color={
                    attendance[item.value] === "ausente" ? "#C30000" : "#ccc"
                  }
                />
                <Text style={styles.checkboxLabel}>Falta</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>ENVIAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#3C83ED',
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
    backgroundColor: "#3C83ED",
    marginBottom: 24,
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
  buttonImage: {
    width: 50,
    height: 50,
  },
  titleBox: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 4,
    color: "#ffffff",
  },
  subTitleBox: {
    fontWeight: "400",
    fontSize: 14,
    color: "#ffffff",
  },
  separator: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  separatorText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000",
  },
  studentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 4,
    borderBottomColor: "#3C83ED",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  studentName: {
    fontSize: 14,
    color: "#000",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  checkboxLabel: {
    marginLeft: 5,
    fontSize: 16,
    color: "#000",
  },
  submitButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#3C83ED",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 3,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});