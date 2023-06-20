import React from 'react';
import {View } from 'react-native';
import EventList from '../../components/EventList';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DetailsScreen({ route }) {
  const { events,selectedDate } = route.params;
  const navigation=useNavigation()
  return (
    
      <View style={{marginTop:50}}>
         <AntDesign name="arrowleft" size={24} color="black" style={{marginLeft:20}} onPress={()=>navigation.goBack()}/>

        
 
      <EventList events={events} selectedDate={selectedDate} />
      </View>

  );
}
