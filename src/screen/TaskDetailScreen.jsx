import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const TaskDetailScreen = ({ route }) => {
  const { task } = route.params;
  const [answer, setAnswer] = useState('');
  const [pdfUri, setPdfUri] = useState(null); // State to store PDF URI
  const navigation = useNavigation();

  const handleDocumentUpload = () => {
  };

  return (
    <View style={styles.container}>
            <TouchableOpacity style={styles.BackButton} onPress={() => navigation.navigate('TaskScreen')}>
        <Ionicons name="arrow-back-outline" size={24} color="#73788B" />
      </TouchableOpacity>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <View style={styles.pdfContainer}>
        {pdfUri ? (
          <WebView
            source={{ uri: pdfUri }}
            style={{ flex: 1, width: '100%' }}
          />
        ) : (
          <Text style={styles.pdfText}>PDF viewer goes here</Text>
        )}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setAnswer}
        value={answer}
        placeholder="Write your answer here"
        multiline
      />
      <Button title="Upload Document" onPress={handleDocumentUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop:20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  pdfContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  pdfText: {
    fontSize: 16,
    color: '#555555',
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default TaskDetailScreen;