import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Quest } from "../models/Home";
import Checkbox from "expo-checkbox";
import PracticeModal from "./PracticeModal"; // Importáljuk a modalt

// Ikonok betöltése
const icons: { [key: string]: any } = {
  quiz: require("../assets/images/icons/quiz.png"),
  code: require("../assets/images/icons/code.png"),
  activity: require("../assets/images/icons/activity.png"),
  default: require("../assets/images/icons/default.png"),
};

// Programozási és sport kategóriák
const programmingCategories = [
  "Python",
  "Flutter",
  "Java",
  "React Native",
  "React",
  "NodeJs",
  "Android",
];
const sportCategories = ["Running", "Swimming", "Cycling", "Football"];

interface Props {
  quest: Quest;
}

const QuestItem: React.FC<Props> = ({ quest }) => {
  const [isChecked, setChecked] = useState(quest.isDone);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  // A kategória neve kisbetűssé alakítva (normalizálás)
  const categoryName = quest.categoryName.toLowerCase();

  // Quest típus meghatározása
  let questType = "Practice";
  let iconSource = icons.default;

  if (quest.checkQuestId === null) {
    questType = "Quiz";
    iconSource = icons.quiz;
  } else if (programmingCategories.includes(quest.categoryName)) {
    questType = "Practice";
    iconSource = icons.code;
  } else if (sportCategories.includes(quest.categoryName)) {
    questType = "Sport";
    iconSource = icons.activity;
  }

  // Quest neve és leírása
  const questName =
    quest.checkQuestId === null
      ? "Quiz"
      : `${quest.checkQuest?.recomendedActivity} ${quest.checkQuest?.mesure}`;

  const extractDurationInMinutes = (mesure: string | undefined) => {
    if (!mesure) return 0;
    const matches = mesure.match(/(\d+)\s*(minutes|min|hours|h)/i);
    if (!matches) return 0;

    const value = parseInt(matches[1]); // Az első szám a "mesure"-ből
    const unit = matches[2].toLowerCase(); // Az időegység (minutes, min, hours, h)

    return unit.includes("hour") || unit.includes("h") ? value * 60 : value; // Ha óra, szorozzuk 60-nal
  };

  const startPracticeQuest = () => {
    setModalVisible(false);
    const durationInMinutes = extractDurationInMinutes(
      quest.checkQuest?.mesure
    );

    router.push(
      `/practice-timer?duration=${durationInMinutes}&description=${encodeURIComponent(
        questName
      )}&xp=${quest.xpLevel}`
    );
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, isChecked && styles.completed]}
        onPress={() => {
          if (questType === "Practice") setModalVisible(true);
          else if (questType === "Quiz") router.push(`/quizz`);
        }}
      >
        <View style={styles.content}>
          {/* Ikon megjelenítése */}
          <Image source={iconSource} style={styles.icon} />

          {/* Szöveg és XP érték */}
          <View style={styles.textContainer}>
            <Text style={styles.text}>{questName}</Text>
            <Text style={styles.xpText}>{quest.xpLevel} XP</Text>
          </View>
        </View>

        {/* Checkbox */}
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#4CAF50" : "#FFF"}
        />
      </TouchableOpacity>

      {/* PracticeModal megjelenítése */}
      <PracticeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onStart={startPracticeQuest}
        duration={quest.checkQuest?.mesure || "Unknown"}
        description={questName}
        xp={quest.xpLevel}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f1",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
  },
  completed: {
    opacity: 0.5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  xpText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
    marginTop: 4,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "transparent",
  },
});

export default QuestItem;
