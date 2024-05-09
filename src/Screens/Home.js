import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Navigation from '../Navigations/Navigation';
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';

const Home = ({navigation}) => {
  const firestore = getFirestore();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // =========================================fetching data from firebase Contacts=============================
    const fetchContacts = async () => {
      try {
        const contactsRef = collection(firestore, 'Contacts');
        const q = query(contactsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedContacts = [];
        querySnapshot.forEach(doc => {
          fetchedContacts.push({id: doc.id, ...doc.data()});
        });
        setContacts(fetchedContacts);
        // console.log(contacts);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching contacts: ', error);
        setError(error); // Set error state if an error occurs
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchContacts();
  }, [contacts]);
  // ============================================deleting data from firebase===================================

  const handleDelete = async (id) => {
    // Show a confirmation alert
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              // Delete the contact if the user confirms
              await deleteDoc(doc(firestore, 'Contacts', id));
              setContacts((prevContacts) =>
                prevContacts.filter((contact) => contact.id !== id)
              );
              Alert.alert('Success', 'Contact deleted successfully.');
            } catch (error) {
              console.error('Error deleting contact: ', error);
              Alert.alert(
                'Error',
                'Failed to delete contact. Please try again later.'
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  const handleUpdate = id => {
    const contactToUpdate = contacts.find(contact => contact.id === id);
    navigation.navigate('UpdateContactScreen', contactToUpdate);
  };

  const handleAddContact = () => {
    navigation.navigate('AddContactScreen');
  };

  const renderItem = ({item}) => (
    <View style={styles.contactContainer}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactInfo}>{item.email}</Text>
      <Text style={styles.contactInfo}>{item.phone}</Text>
      <Text style={styles.contactInfo}>{item.address}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleUpdate(item.id)}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginLeft: 10,
          }}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>; // Render loading indicator while data is being fetched
  }

  if (error) {
    return <Text>Error: {error.message}</Text>; // Render error message if an error occurs
  }

  // If contacts are empty, render a message indicating no contacts found
  if (contacts.length === 0) {
    return(<View style={{flexDirection:'column'}}><View style={{width:'100%',alignItems:'center',marginTop:20}}>
    <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>
     <Text>No contacts found</Text></View></View>)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#7CFC00',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  contactContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#7CFC00',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
