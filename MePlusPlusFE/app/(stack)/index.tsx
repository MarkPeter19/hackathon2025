import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Button title="Make a Plan" onPress={() => router.push("/(stack)/planner")} />
      <Button title="Test a Quizz" onPress={() => router.push("/(stack)/quizz")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

});
