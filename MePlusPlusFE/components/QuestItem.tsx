import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Quest } from "../models/Home";
import Checkbox from "expo-checkbox";

// load icons
const icons: { [key: string]: any } = {
  activity: require("../assets/images/icons/activity.png"),
  quiz: require("../assets/images/icons/quiz.png"),
  code: require("../assets/images/icons/code.png"),
  default: require("../assets/images/icons/default.png"),
};

interface Props {
  quest: Quest;
}

const QuestItem: React.FC<Props> = ({ quest }) => {
  const [isChecked, setChecked] = useState(quest.isDone);

  // Quest name and descrpition
  const questName =
    quest.checkQuestId === null
      ? "10 Flash Cards"
      : `${quest.checkQuest?.recomendedActivity} ${quest.checkQuest?.mesure}`;

  // Select icon
  const iconSource =
    questName.toLowerCase().includes("flash")
      ? icons.quiz
      : questName.toLowerCase().includes("run")
      ? icons.activity
      : questName.toLowerCase().includes("code")
      ? icons.code
      : icons.default;

  return (
    <TouchableOpacity style={[styles.container, isChecked && styles.completed]}>
      <View style={styles.content}>
        {/* Icon */}
        <Image source={iconSource} style={styles.icon} />

        {/* text and xp */}
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
