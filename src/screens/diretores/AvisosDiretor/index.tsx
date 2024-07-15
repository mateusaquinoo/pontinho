import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from "react-native-gesture-handler";

const noticesData = [
  { id: 1, type: "Reunião", message: "Reunião com todos os professores no dia 15/06 às 14h na sala de reuniões.", date: "2024-06-10" },
  { id: 2, type: "Funcionamento", message: "A escola estará fechada no dia 20/06 devido ao feriado municipal.", date: "2024-06-08" },
  { id: 3, type: "Manutenção", message: "Manutenção na sala 101 no dia 25/06. As aulas serão transferidas para a sala 102.", date: "2024-06-12" },
  // Adicione mais avisos conforme necessário
];

const Avisos = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avisos</Text>
      </View>
      <View style={styles.container}>
        

        <FlatList
          data={noticesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.noticeContainer}>
              <Text style={styles.noticeType}>Tipo: <Text style={styles.noticeTypeSpan}>{item.type}</Text></Text>
              <Text style={styles.noticeMessage}>{item.message}</Text>
              <Text style={styles.noticeDate}>Data: {item.date}</Text>
            </View>
          )}
        />
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
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 10,
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
    gap: 20,
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
    color: "#ffffff",
  },
  subTitleBox: {
    fontWeight: "400",
    fontSize: 14,
    color: "#ffffff",
  },
  noticeContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#FFD426",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 10,
  },
  noticeType: {
    fontSize: 18,
    fontWeight: '600',
    color: "#000",
    marginBottom: 12,
  },
  noticeTypeSpan: {
    fontWeight: '700',
    color: "#28a745",
  },
  noticeMessage: {
    fontSize: 16,
    color: "#000",
    fontWeight: "300",
    marginBottom: 16,
  },
  noticeDate: {
    fontSize: 12,
    fontWeight: "200"
  },
});

export default Avisos;