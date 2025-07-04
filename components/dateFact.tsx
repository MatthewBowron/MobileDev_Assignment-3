import { Image, StyleSheet, View, Text } from 'react-native';
import { FunctionComponent, useEffect, useState } from 'react';
import http from 'http';

interface Props { 
    month: number, 
    day: number ; 
}

const DateFact: FunctionComponent<Props> = ({month, day}) => {

  // State to hold the fact and validation status
  // Using string | null to handle the case when no fact is available
  const [fact, setFact] = useState<string | null>(null);

  const fetchData = async () => {

    // Resetting the fact before fetching new data
    setFact(null);

    try {
        const response = await fetch(`https://numbersapi.p.rapidapi.com/${month}/${day}/date`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'b0841948femshe44418e3aa4337cp1b5eb0jsn051e25aa7a3d',
            'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
        },})   
      
        // Check if the response is ok (status in the range 200-299)
        // If not, throw an error with the status code and message
        if (!response.ok) {
          throw {
            status: response.status,
            message: response.status === 404 ? 'Not Found' : 'An error occurred',
          };
        };
        
        // If the response is ok, read the response text
        // and set the fact state with the data
        let data = await response.text();
        setFact(data);
      
    }
    catch (error) {
        // printing the error to the console for debugging purposes
        // and setting the fact state with an error message
        console.error('an error happened:', error);
        setFact('An error occurred while fetching the fact.');
      }
  };


  useEffect( () =>{
    
    const timeout = setTimeout(()=> {
      fetchData();
      }, 500);
    
      return () => clearTimeout(timeout);
  }, [month, day]);


  return (
    <View style={styles.container}>
      <View style={styles.factBox}>
        <Text style={styles.factTitle}>Random Fact for {month} / {day}:</Text>
        <Text style={styles.factText}>{fact}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  factBox: {
    backgroundColor: '#e0f0ff',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    maxWidth: '90%',
    borderColor: '#007BFF',
    borderWidth: 1.5,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  factText: {
    fontSize: 15,
    color: '#444',
  },
});

export default DateFact;