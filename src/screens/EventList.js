import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export default function EventList({ events }) {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    if (events) {
      const filteredEvents = events.filter(event => event.isAktif !== false);
      setEventList(filteredEvents);
    }
  }, [events]);

  const handleDeleteEvent = async (eventId) => {
    try {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, { isAktif: false });
      console.log('Event deleted successfully!');

      const updatedEvents = eventList.filter(event => event.id !== eventId);
      setEventList(updatedEvents);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const renderItem = ({ item }) => {
    if (item.isDeleted) {
      return null;
    }


    
    return (
      <View style={{ borderColor: '#4158D0', borderWidth: 1, borderRadius: 15, marginBottom: 8, marginHorizontal: 15, alignItems: 'center' }}>
        <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>Başlık: {item.title}</Text>
        <Text style={{ fontSize: 17, color: 'black', fontWeight: '600' }}>Tarih: {item.date}</Text>
        <Text style={{ fontSize: 17, color: 'black', fontWeight: '600' }}>Hatırlatıcı: {item.reminder}</Text>
        <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={eventList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={eventList}
      />
    </View>
  );
}
