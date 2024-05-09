import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../firebase/firebase';
import { getFirestore ,doc, updateDoc,collection} from 'firebase/firestore';

const UpdateContactScreen = ({ route, navigation }) => {
  const { id, name: initialName, phone: initialPhone, email: initialEmail, address: initialAddress } = route.params;
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [address, setAddress] = useState(initialAddress);

  const handleUpdateContact = async () => {
    try {
      const firestore = getFirestore();
      const contactRef = doc(firestore, 'Contacts', id);
      await updateDoc(contactRef, { name, phone, email, address });
      Alert.alert('Success', 'Contact updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating contact: ', error);
      Alert.alert('Error', 'Failed to update contact. Please try again later.');
    }
  };
  
  

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
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateContact}>
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
    backgroundColor: '#007bff',
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

export default UpdateContactScreen;
