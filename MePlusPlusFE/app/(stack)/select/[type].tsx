import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import OptionButton from "@/components/OptionButton";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import RankSelector from "@/components/RankSelector";
import DatePickerInput from "@/components/DatePickerInput";


// Az elérhető lehetőségek és ikonok a react-native-vector-icons FontAwesome családból
const options: Record<string, { name: string; icon: string }[]> = {
  code: [
    { name: "React Native", icon: "mobile" },
    { name: "Flutter", icon: "cloud" },
    { name: "Node.js", icon: "server" },
    { name: "Python", icon: "code" },
    { name: "Java", icon: "coffee" },
    { name: "Android", icon: "android" },
  ],
  sport: [
    { name: "Running", icon: "child" },
    { name: "Biking", icon: "bicycle" },
    { name: "Swimming", icon: "tint" },
    { name: "Football", icon: "futbol-o" },
  ],
};

export default function SelectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Biztonságos típuskonverzió
  const type = Array.isArray(params.type) ? params.type[0] : params.type;

  // Ellenőrizzük, hogy helyes típus érkezett-e
  if (!type || !options.hasOwnProperty(type)) {
    return (
      <View style={styles.scrollContainer}>
        <Text style={styles.title}>Invalid selection</Text>
        <Button title="Back" onPress={() => router.back()} />
      </View>
    );
  }

  // State-ek a kiválasztott értékekhez
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timePerDay, setTimePerDay] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [finalGoal, setFinalGoal] = useState("");
  const [rank, setRank] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>
        {type === "code" ? "Choose a Technology" : "Choose a Sport"}
      </Text>

      {/* Wrapben megjelenő lehetőségek */}
      <View style={styles.optionsContainer}>
        {options[type].map((item, index) => (
          <OptionButton
            key={index}
            title={item.name}
            iconName={item.icon}
            selected={selectedOption === item.name}
            onPress={() => setSelectedOption(item.name)}
          />
        ))}
      </View>

      {/* Ha a user választott egy opciót, megjelennek az input mezők */}
      {selectedOption && (
        <View style={styles.formContainer}>
          <CustomInput
            label="How much time do you do this a day?"
            value={timePerDay}
            onChangeText={setTimePerDay}
            placeholder="Hours per day"
            keyboardType="numeric"
          />

          <DatePickerInput
            label="Select a deadline"
            value={deadline}
            onChange={setDeadline}
          />

          <CustomInput
            label="What is your final goal?"
            value={finalGoal}
            onChangeText={setFinalGoal}
            placeholder="Enter your goal"
          />

          <RankSelector selectedRank={rank} onSelectRank={setRank} />

          {/* Save gomb */}
          <CustomButton title="Save" onPress={() => router.replace("/")} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
