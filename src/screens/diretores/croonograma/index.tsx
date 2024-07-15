import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import CalendarStrip from 'react-native-calendar-strip';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const months = [
  { label: "Janeiro", value: "01" },
  { label: "Fevereiro", value: "02" },
  { label: "Março", value: "03" },
  { label: "Abril", value: "04" },
  { label: "Maio", value: "05" },
  { label: "Junho", value: "06" },
  { label: "Julho", value: "07" },
  { label: "Agosto", value: "08" },
  { label: "Setembro", value: "09" },
  { label: "Outubro", value: "10" },
  { label: "Novembro", value: "11" },
  { label: "Dezembro", value: "12" },
];

const events: { [key: string]: { date: string; event: string; }[] } = {
  "01": [
    { date: "2024-01-01", event: "Ano Novo" },
    { date: "2024-01-15", event: "Reunião de Professores" },
  ],
  "02": [
    { date: "2024-02-14", event: "Dia dos Namorados" },
    { date: "2024-02-20", event: "Carnaval" },
  ],
  // Adicione mais eventos conforme necessário
};

export default function Cronograma() {
  const navigation = useNavigation();

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<{ date: string; event: string; }[]>([]);

  const handleMonthChange = (value: string | null) => {
    setSelectedMonth(value);
    setSelectedEvents(events[value || ""] || []);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendário</Text>
      </View>


      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={handleMonthChange}
          items={months}
          placeholder={{ label: "Selecione um mês", value: null }}
          style={pickerSelectStyles}
          Icon={() => <Ionicons style={styles.pickerIcon} name="chevron-down" size={24} color="#28a745" />}
        />
      </View>

      {selectedMonth && (
        <View style={styles.eventsContainer}>
          <CalendarStrip
            style={styles.calendar}
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            daySelectionAnimation={{
              type: 'background',
              duration: 200,
              highlightColor: '#ffffff',
            }}
            markedDates={selectedEvents.map(event => ({
              date: event.date,
              dots: [{ color: 'red', selectedDotColor: 'red' }],
            }))}
            scrollable
            scrollerPaging
          />
          <FlatList
            data={selectedEvents}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <View style={styles.eventContainer}>
                <Text style={styles.eventDate}>{item.date}</Text>
                <Text style={styles.eventText}>{item.event}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
  pickerContainer: {
    marginBottom: 20,
    marginHorizontal: 24,
    marginTop: 25,
  },
  pickerIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  eventsContainer: {
    marginHorizontal: 24,
  },
  calendar: {
    height: 120,
    paddingTop: 25,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    borderBottomColor: "#28a745",
    borderBottomWidth: 3,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  eventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#28a745",
    backgroundColor: "#28a745",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "700",
  },
  eventText: {
    fontSize: 16,
    color: "#fff",
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