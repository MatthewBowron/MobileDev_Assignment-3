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
import { Picker } from '@react-native-picker/picker'; // 🆕 Picker added

export default function App() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter a date to get a random fact</Text>

          {/* created a dropdown menu for month */}
          <Text style={styles.label}>Month:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={month}
              onValueChange={(value) => setMonth(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Month" value="" />
              <Picker.Item label="January" value="1" />
              <Picker.Item label="February" value="2" />
              <Picker.Item label="March" value="3" />
              <Picker.Item label="April" value="4" />
              <Picker.Item label="May" value="5" />
              <Picker.Item label="June" value="6" />
              <Picker.Item label="July" value="7" />
              <Picker.Item label="August" value="8" />
              <Picker.Item label="September" value="9" />
              <Picker.Item label="October" value="10" />
              <Picker.Item label="November" value="11" />
              <Picker.Item label="December" value="12" />
            </Picker>
          </View>

          {/* Day Input */}
          <Text style={styles.label}>Day:</Text>
          <TextInput
            style={styles.inputWhite}
            placeholder="Enter day (1–31)"
            keyboardType="number-pad"
            onChangeText={(text) => setDay(text)}
          />

          {/* Render fact only if both values are set */}
          {month && day ? (
            <DateFact month={parseInt(month)} day={parseInt(day)} />
          ) : null}
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
  pickerWrapper: {
    width: 200,
    backgroundColor: '#fff',
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 40,
  },
});
