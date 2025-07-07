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
import { SetStateAction, useState } from 'react';
import {Picker} from '@react-native-picker/picker';

import DateFact from './components/dateFact';
import monthData from './months.json'

export default function App() {
  const months = [...monthData];
  const [monthIndex, setMonthIndex] = useState(-1);
  const [day, setDay] = useState(0);

  const validDate = () => day >= 1 && day <= months[monthIndex].days;

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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Month:</Text>
            <Picker 
              mode='dropdown'
              style = {Platform.OS === 'ios' ? styles.iosPicker : styles.inputWhite}
              selectedValue={monthIndex}
              onValueChange={(itemValue: number) => setMonthIndex(itemValue)}
            >
              <Picker.Item label={Platform.OS === 'ios' ? "" : "Select A Month:"} enabled={false} value={-1} />
              {months.map( (month, index) => (
                <Picker.Item key={month.number} label={month.name} value={index}  />
              ))}
            </Picker>
          </View>

          {monthIndex!=-1 && <View> 
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Day:</Text>
              <TextInput
                style={styles.inputWhite}
                placeholder={`Enter day (1–${months[monthIndex].days})`}
                keyboardType="number-pad"
                onChangeText={(text) => setDay(parseInt(text) || 0)}
              />
            </View>

            {validDate() ? <DateFact month={months[monthIndex].number} day={day} /> : (
              <Text style={styles.errorText}>
                Invalid date. Please enter a day (1-{months[monthIndex].days}).
              </Text>
            )}

          </View>}
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
    flexDirection:'row',
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
    height: 210,
    paddingHorizontal: 10,
  },
  inputWhite: {
    width: 200,
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#000'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});