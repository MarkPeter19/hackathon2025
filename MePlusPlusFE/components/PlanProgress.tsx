import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PlanIndicator } from "../models/Home";
import { CircularProgress } from "react-native-circular-progress";

interface Props {
  plan: PlanIndicator;
}

const PlanProgress: React.FC<Props> = ({ plan }) => {
  return (
    <View style={styles.container}>
      <CircularProgress
        size={60}
        width={5}
        fill={(plan.progressed / 100) * 100}
        tintColor="#4CAF50"
        backgroundColor="#e0e0e0"
      />
      <Text style={styles.text}>{plan.categoryName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PlanProgress;
