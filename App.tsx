'use client'
import { StyleSheet, Text, View } from 'react-native';
import DateFact from './components/dateFact';
import { useState } from 'react';

export default function App() {
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  const isDateValid = () => {
    return true;
  }

  return (
    <View style={styles.container}>
      
      {isDateValid() && <DateFact month={month} day={day} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
