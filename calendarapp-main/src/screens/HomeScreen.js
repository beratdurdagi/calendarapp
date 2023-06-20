import React, { useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { auth, db } from "../../Firebase/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import AddEventModal from "../../components/AddEventModal";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

LocaleConfig.locales["tr"] = {
  monthNames: [
    "Ocak",
    "Subat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Agustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  monthNamesShort: [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ],
  dayNames: [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ],
  dayNamesShort: ["Pzt", "Sl", "Çrş", "Pers", "Cm", "Cmrts", "Pzr"],
  today: "bugün",
};
LocaleConfig.defaultLocale = "tr";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState([]);
  const [aktifMi, setaktifMi] = useState(true);
  const [isAddEventModalVisible, setAddEventModalVisibility] = useState(false);
  const [reminder, setReminder] = useState(null);

  useEffect(() => {
    const myUserUid = auth.currentUser.uid;
    const eventsRef = query(
      collection(db, "events"),
      where("userUid", "==", myUserUid)
    );
    const unsubscribe = onSnapshot(eventsRef, (snapshot) => {
      const eventsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        date: doc.data().date,
        reminder: doc.data().reminder,
        aktifMi: doc.data().aktifMi,
      }));
      setEvents(eventsList);
    });

    return unsubscribe;
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const addEvent = async (title, reminder) => {
    const event = {
      title: title,
      date: selectedDate,
      reminder: reminder,
      aktifMi: aktifMi,
    };

    const myUserUid = auth.currentUser.uid;

    // Cloud Firestore'e veri ekle
    await addDoc(collection(db, "events"), {
      ...event,
      userUid: myUserUid,
    });
    console.log("Event added to Firestore successfully!");

    if (reminder) {
      const reminderDate = new Date(selectedDate);
      reminderDate.setHours(reminder);
      reminderDate.setMinutes(0);
      reminderDate.setSeconds(0);

      // Şu anki zamandan önceyse, bildirimi gösterme
      if (reminderDate > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Event Reminder",
            body: `${title} is starting soon!`,
          },
          trigger: reminderDate,
        });
      }
    }
  };

  const showAddEventModal = () => {
    setAddEventModalVisibility(true);
  };

  const hideAddEventModal = () => {
    setAddEventModalVisibility(false);
  };

  const navigation = useNavigation();

  function renderCalendar() {
    return (
      <Calendar
        hideExtraDays={true}
        style={{
          marginTop: 50,
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "gray",
          height: 500,
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          handleDayPress(day);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
          },
        }}
        theme={{
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#fff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e",
        }}
      />
    );
  }
  function renderButton() {
    return (
      <View style={styles.buttonContaier}>
        {selectedDate ? (
          <>
            <Pressable
              style={{
                ...styles.button,
                marginBottom: 20,
                backgroundColor: "blue",
              }}
              onPress={showAddEventModal}
            >
              <Text style={{...styles.textTitle,color:'white'}}>Event Ekle</Text>
            </Pressable>

            <AddEventModal
              isVisible={isAddEventModalVisible}
              onClose={hideAddEventModal}
              onAddEvent={addEvent}
              selectedDate={selectedDate}
            />

           
          </>
        ) : (
          <Text
            style={{ alignSelf: "center", color: "black", ...styles.textTitle,marginBottom:5 }}
          >
            Please select a date
          </Text>
        )}
         <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate("Details", {
                  events: events,
                  selectedDate: selectedDate,
                })
              }
            >
              <Text style={{...styles.textTitle,color:'white'}}>Eventleri Göster</Text>
            </Pressable>
      </View>
    );
  }
  return (
    <SafeAreaView>
      {renderCalendar()}
      {renderButton()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: "red",
    width: 350,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
  },
  textTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContaier: {
    marginTop: 30,
  },
});
