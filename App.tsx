'use client';
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
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import DateFact from './components/dateFact';
import monthData from './months.json';

export default function App() {
  const months = [...monthData];
  const [monthIndex, setMonthIndex] = useState(0);
  const [day, setDay] = useState(0);

  const validDate = () => day >= 1 && day <= months[monthIndex].days;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter a date to get a random fact</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Month:</Text>
            <Picker
              mode="dropdown"
              selectedValue={monthIndex}
              onValueChange={(itemValue) => setMonthIndex(itemValue)}
              style={Platform.OS === 'ios' ? styles.iosPicker : styles.androidPicker}
              itemStyle={styles.pickerItem}
            >
              {months.map((month, index) => (
                <Picker.Item
                  key={month.number}
                  label={month.name}
                  value={index}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Day:</Text>
            <TextInput
              style={styles.inputWhite}
              placeholder={`Enter day (1–${months[monthIndex].days})`}
              keyboardType="number-pad"
              onChangeText={(text) => setDay(parseInt(text) || 0)}
              placeholderTextColor="#999"
            />
          </View>

          {validDate() ? (
            <DateFact month={months[monthIndex].number} day={day} />
          ) : (
            <Text style={styles.errorText}>
              Invalid date. Please enter a day (1–{months[monthIndex].days}).
            </Text>
          )}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  label: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  iosPicker: {
    width: 200,
    height: 180,
  },
  androidPicker: {
    width: 200,
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 8,
    color: '#000', // fixes Android invisible text
  },
  pickerItem: {
    fontSize: 16,
    color: '#000',
  },
  inputWhite: {
    width: 200,
    height: 40,
    backgroundColor: '#ffffff',
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});
