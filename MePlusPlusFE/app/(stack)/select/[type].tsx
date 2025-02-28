import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

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

  // State-ek a kiválasztott értékekhez
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timePerDay, setTimePerDay] = useState("");
  const [duration, setDuration] = useState("");
  const [finalGoal, setFinalGoal] = useState("");
  const [rank, setRank] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === "code" ? "Choose a Technology" : "Choose a Sport"}
      </Text>

      {/* Wrapben megjelenő lehetőségek */}
      <View style={styles.optionsContainer}>
        {options[type].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === item && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ha a user választott egy opciót, megjelennek az input mezők */}
      {selectedOption && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>How much time do you do this a day?</Text>
          <TextInput
            style={styles.input}
            value={timePerDay}
            onChangeText={setTimePerDay}
            placeholder="Hours per day"
            keyboardType="numeric"
          />

          <Text style={styles.label}>
            {type === "code" ? "How long you want to learn this?" : "How long you want to sport like this?"}
          </Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            placeholder="Weeks/Months"
          />

          <Text style={styles.label}>What is your final goal?</Text>
          <TextInput
            style={styles.input}
            value={finalGoal}
            onChangeText={setFinalGoal}
            placeholder="Enter your goal"
          />

          <Text style={styles.label}>What is your rank?</Text>
          <TextInput
            style={styles.input}
            value={rank}
            onChangeText={setRank}
            placeholder="Beginner/Intermediate/Advanced"
          />

          {/* Save gomb */}
          <Button title="Save" onPress={() => router.push("/")} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  selectedOption: {
    backgroundColor: "#007bff",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
});

