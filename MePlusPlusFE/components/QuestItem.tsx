import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Quest } from "../models/Home";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  quest: Quest;
}

const QuestItem: React.FC<Props> = ({ quest }) => {
  const questName =
    quest.checkQuestId === null ? "10 Flash Cards" : `${quest.checkQuest?.recomendedActivity} ${quest.checkQuest?.mesure}`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{questName}</Text>
      <Text style={styles.xpText}>{quest.xpLevel} XP</Text>
      {quest.isDone && <FontAwesome name="check-circle" size={20} color="green" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  xpText: {
    fontSize: 14,
    color: "green",
  },
});

export default QuestItem;
