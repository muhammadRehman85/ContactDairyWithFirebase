import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from "../firebase/firebase"

import 'firebase/firestore';
import app from '../firebase/firebase';
import {getFirestore, collection, addDoc, Firestore, query, where, getDocs, serverTimestamp} from "firebase/firestore"; 
const AddContactScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const firestore = getFirestore();
  const [loading, setLoading] = useState(false);
  const handleSaveContact = async () => {

      try {
      // Check if a contact with the same name already exists
      const contactQuery = query(collection(firestore, 'Contacts'), where('name', '==', name));
      const querySnapshot = await getDocs(contactQuery);
      
      if (!querySnapshot.empty) {
        Alert.alert('Error', 'A contact with the same name already exists.');
        return;
      }

      // If no contact with the same name exists, add the new contact
      const docRef = await addDoc(collection(firestore, 'Contacts'), {
        name: name,
        phone: phone,
        email: email,
        address: address,
         createdAt: serverTimestamp()
      });
        console.log("Document written with ID: ", docRef.id);
        Alert.alert("Contact saved successfully")
        ;
        navigation.goBack();
        
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true); // Set loading state to true when fetching data
          // Simulate slow database fetch
          await new Promise(resolve => setTimeout(resolve, 2000));
          setLoading(false); // Set loading state to false when data fetch is complete
        } catch (error) {
          console.error('Error fetching data: ', error);
          setLoading(false); // Set loading state to false in case of error
        }
      };
  
      fetchData();
    }, []);
  
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#7CFC00',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddContactScreen;
