import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface RankSelectorProps {
  selectedRank: string;
  onSelectRank: (rank: string) => void;
}

const ranks = ["Bronze", "Silver", "Gold"];

const RankSelector: React.FC<RankSelectorProps> = ({ selectedRank, onSelectRank }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>What is your rank?</Text>
      <View style={styles.optionsContainer}>
        {ranks.map((rank, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedRank === rank && styles.selectedOption,
            ]}
            onPress={() => onSelectRank(rank)}
          >
            <Text style={styles.optionText}>{rank}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
  },
  selectedOption: {
    backgroundColor: "#ccc",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RankSelector;
