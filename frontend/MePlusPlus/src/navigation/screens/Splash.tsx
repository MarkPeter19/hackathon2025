import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home'); // Átnavigálunk a HomeScreen-re
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default SplashScreen;
