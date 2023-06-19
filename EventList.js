import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

export default function EventList({ events }) {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    if (events) {
      const filteredEvents = events.filter((event) => event.aktifMi !== false);
      setEventList(filteredEvents);
    }
  }, [events]);

  const handleDeleteEvent = async (eventId) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, { aktifMi: false });
      console.log("Event deleted successfully!");

      const updatedEvents = eventList.filter((event) => event.id !== eventId);
      setEventList(updatedEvents);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const renderItem = ({ item }) => {
    if (item.isDeleted) {
      return null;
    }

    return (
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.renderContainer}>
          <View style={{ padding: 10, marginLeft: 10 }}>
            <Text style={styles.title}>
              Başlık: {item.title}
            </Text>
            <Text style={styles.subTitle}>
              Tarih: {item.date}
            </Text>
            <Text style={styles.subTitle}>
              Hatırlatıcı: {item.reminder}:00
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteEvent(item.id)}
            style={{ marginRight: 15 }}
          >
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ marginBottom: 50 }}>
      <FlatList
        data={eventList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={eventList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  renderContainer: {
    borderColor: "#4158D0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subTitle:{
    fontSize: 17, fontWeight: "700"
  },
  title:{
    fontSize: 19, fontWeight: "bold"

  }
});
