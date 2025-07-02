'use client'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DateFact from './components/dateFact';
import { useState } from 'react';


export default function App() {
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);

  return (
    // Using KeyboardAvoidingView to handle keyboard appearance
    // and TouchableWithoutFeedback to dismiss the keyboard when tapping outside inputs
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Dismissing keyboard when tapping outside the input fields */}
      {/* This is useful for better user experience on mobile devices */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter a date to get a random fact</Text>


          <Text style={styles.label}>Month:</Text>
          <TextInput
            style={styles.inputWhite}
            placeholder="Enter month (1–12)"
            keyboardType="number-pad"
            onChangeText={(text) => setMonth(parseInt(text) || 0)}
          />


          <Text style={styles.label}>Day:</Text>
          <TextInput
            style={styles.inputWhite}
            placeholder="Enter day (1–31)"
            keyboardType="number-pad"
            onChangeText={(text) => setDay(parseInt(text) || 0)}
          />


          <DateFact month={month} day={day} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  inputWhite: {
    width: 200,
    height: 40,
    backgroundColor: '#ffffff',
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
