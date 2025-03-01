import React from "react";
import { FlatList } from "react-native";
import QuestItem from "./QuestItem";
import { Quest } from "../models/Home";

interface Props {
  quests: Quest[];
}

const QuestList: React.FC<Props> = ({ quests }) => {
  // Quiz típusú questek előresorolása
  const sortedQuests = [
    ...quests.filter((quest) => quest.checkQuestId === null), // Quiz questek előre
    ...quests.filter((quest) => quest.checkQuestId !== null), // Többi quest később
  ];

  return (
    <FlatList
      data={sortedQuests}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <QuestItem quest={item} />}
    />
  );
};

export default QuestList;
