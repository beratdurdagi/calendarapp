import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function AddEventModal({ isVisible, onClose, onAddEvent,selectedDate }) {
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newReminder, setNewReminder] = useState("");

  const handleAddEvent = () => {
    onAddEvent(newEventTitle, newReminder);
    setNewEventTitle("");
    setNewReminder("");
  };
  const navigation = useNavigation();

  function renderButton() {
    return (
      <>
        <Pressable style={styles.button} onPress={handleAddEvent}>
          <Text style={styles.subTitle}>Ekle</Text>
        </Pressable>
      </>
    );

  
    }
    function renderInput() {
      return (
        <>
        
          <Text
            style={{ fontSize: 27, fontWeight: "bold", textAlign: "center" }}
          >
            Yeni Event Ekle
          </Text>
          <Text style={{fontSize:20,textAlign: "center"}}>Date: {selectedDate}</Text>

          
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNewEventTitle(text)}
            value={newEventTitle}
            placeholder="Event Basligi"
            numberOfLines={5}
            maxLength={100}
            
          />
        </>
      );}

  function renderReminderPicker() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <Text style={{ fontSize: 27, fontWeight: "bold", textAlign: "center" }}>
          Hatırlatıcı Ekle
        </Text>
        <Picker
          selectedValue={newReminder}
          onValueChange={(itemValue) => setNewReminder(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="None" value={null} />
          {Array.from({ length: 24 }, (_, i) => (
            <Picker.Item key={i} label={i.toString()} value={i} />
          ))}
        </Picker>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Modal visible={isVisible} animationType="slide">
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={{ marginTop: 20, marginLeft: 20 }}
          onPress={onClose}
        />

        <View style={{ marginTop: 50 }}>
          {renderInput()}
          {renderReminderPicker()}

          {renderButton()}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 12,
    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: "blue",
    width: 300,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
  },
  subTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 20,
    fontSize:17,
    height: 70,

  },
  picker: {
    marginTop: 15,
    width: 200,
    color: "black",
    height: 50,
    backgroundColor: "#f0f0f0", // Add a background color
    borderRadius: 5, // Add rounded corners
    borderColor: "#ccc", // Add a border color
    borderWidth: 2, // Add a border width
  },
  pickerItem: {
    fontWeight: "700",
    fontSize: 18, // Increase the font size
    paddingVertical: 5, // Add some vertical padding
  },
});
