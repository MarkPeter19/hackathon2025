import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React from "react";

// Az elérhető lehetőségek
const options: Record<string, string[]> = {
  code: ["React Native", "Flutter", "Node.js", "Python"],
  sport: ["Running", "Biking", "Swimming", "Yoga"],
};

export default function SelectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Biztonságos típuskonverzió
  const type = Array.isArray(params.type) ? params.type[0] : params.type;

  // Ellenőrizzük, hogy helyes típus érkezett-e
  if (!type || !options.hasOwnProperty(type)) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Invalid selection</Text>
        <Button title="Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === "code" ? "Choose a Technology" : "Choose a Sport"}
      </Text>
      {options[type].map((item, index) => (
        <Button key={index} title={item} onPress={() => console.log(`${item} selected`)} />
      ))}
      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
