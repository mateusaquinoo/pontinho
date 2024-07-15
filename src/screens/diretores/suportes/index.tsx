import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


const Suporte = () => {
  const navigation= useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajuda</Text>
      </View>
      <View style={{
        paddingHorizontal: 20,
        marginTop: 10
      }}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.icone}>
            <Ionicons name="logo-whatsapp" size={30} color={"white"} />
          </View>
          <View>
            <Text style={styles.textCard}>Conselho Tutelar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.icone}>
            <Ionicons name="help-outline" size={30} color={"white"} />
          </View>
          <View>
            <Text style={styles.textCard}>Duvidas Frequentes</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 20,
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
  titulo: {
    fontSize: 24,
    color: "#034677",
    fontWeight: "700",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    borderColor: "#1b7940",
    backgroundColor: "#f3f3f3",
    marginBottom: 20,
    opacity: 0.8,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.65,
  },
  textCard: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  icone: {
    backgroundColor: "#1b7940",
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  logochackes: {
    width: 250,
    opacity: 0.2,
    position: "absolute",
    transform: [{ translateX: 85 }],
    bottom: "20%",
    zIndex: -1,
  },
});

export default Suporte;