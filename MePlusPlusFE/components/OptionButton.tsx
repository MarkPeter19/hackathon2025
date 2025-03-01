import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"; 
import { icons } from "@/components/PlanProgress";


interface OptionButtonProps {
  title: string;
  iconName: string;
  selected: boolean;
  onPress: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ title, iconName, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.optionButton, selected && styles.selectedOption]}
      onPress={onPress}
    >
      <FontAwesome name={iconName} size={20} color={"#000"} />
      <Text style={[styles.optionText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    padding: 10,
    margin: 5,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  selectedOption: {
    backgroundColor: "#ccc",
  },
  optionText: {
    color: "#000",
    fontSize: 16,
  },
});

export default OptionButton;
