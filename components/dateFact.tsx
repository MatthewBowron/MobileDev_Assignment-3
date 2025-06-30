import { Image, StyleSheet, View, Text } from 'react-native';
import { FunctionComponent, useEffect, useState } from 'react';

interface Props { 
    month: number, 
    day: number ; 
}

const DateFact: FunctionComponent<Props> = ({month, day}) => {

  const fetchData = () => {
  }

  useEffect( () =>{
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default DateFact;