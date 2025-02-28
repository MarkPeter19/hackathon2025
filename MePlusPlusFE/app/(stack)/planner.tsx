import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

export default function PlannerScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a plan type</Text>
      <Button 
        title="Add Code Practice" 
        onPress={() => router.push("/(stack)/select/code")} 
      />
      <Button 
        title="Select Sport Activity" 
        onPress={() => router.push("/(stack)/select/sport")} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20, // Gombok közti távolság
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
