import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View,SafeAreaView} from 'react-native';


import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';


export default function AddEventModal({ isVisible, onClose, onAddEvent }) {
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newReminder, setNewReminder] = useState('');

  const handleAddEvent = () => {
    onAddEvent(newEventTitle, newReminder);
    setNewEventTitle('');
    setNewReminder('');
  };
  const navigation=useNavigation()
  return (
  <SafeAreaView>
    <Modal visible={isVisible} animationType="slide" >
      <AntDesign name="arrowleft" size={24} color="black" style={{marginTop:20,marginLeft:20}} onPress={onClose}/>

       
      <View style={{marginTop:50  }}>
      <Text style={{fontSize:27,fontWeight:'bold',textAlign:'center'}}>Yeni Event Ekle</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNewEventTitle(text)}
        value={newEventTitle}
        placeholder="Event Basligi"

   
      />
      <TextInput
       value={newReminder}
       setValue={setNewReminder}
       onChangeText={(text) => setNewReminder(text)}
       placeholder="Reminder (e.g. 9:00)"
       style={styles.input}
   
      />

    
        
      </View>



      <Pressable
         style={styles.button}
      
         onPress={handleAddEvent}>
            <Text style={styles.subTitle}>Ekle</Text>
            </Pressable>
            <Pressable
         style={styles.button}
      
         onPress={onClose}>
            <Text style={styles.subTitle}>Geri Git</Text>
            </Pressable>
     
  
      
          
    </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button:{
    marginVertical:10,
    borderRadius:12,
    marginLeft:'auto',
    marginRight:'auto',
   

    
    backgroundColor:'pink',
    width:300,
    alignItems:'center',
    height:40,
    justifyContent: 'center',

  },
  subTitle:{
    color:'white',
    fontSize:17,
    fontWeight:'700'

  },
  input: {
 
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:15,
    height:48
  },
}
  )