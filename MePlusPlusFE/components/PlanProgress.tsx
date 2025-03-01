import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { PlanIndicator } from "../models/Home";
import { CircularProgress } from "react-native-circular-progress";
import { useRouter } from 'expo-router';

// icons
const icons: { [key: string]: any } = {
  Running: require("../assets/images/icons/running.png"),
  Biking: require("../assets/images/icons/bike.png"),
  swimming: require("../assets/images/icons/swimming.png"),
  football: require("../assets/images/icons/football.png"),
  Python: require("../assets/images/icons/python.png"),
  React_Native: require("../assets/images/icons/react.png"),
  React: require("../assets/images/icons/react.png"),
  Java: require("../assets/images/icons/java.png"),
  Android: require("../assets/images/icons/android.png"),
  NodeJs: require("../assets/images/icons/node-js.png"),
  Flutter: require("../assets/images/icons/flutter.png"),
  // default
  default: require("../assets/images/icons/default.png"),
};

interface Props {
  plan: PlanIndicator;
}

const PlanProgress: React.FC<Props> = ({ plan }) => {
  // 7 segments
  const progressSegments = Math.min(7, Math.floor((plan.progressed / 100) * 7));
  const progressPercentage = (progressSegments / 7) * 100;

  // select icon by category name
  const iconSource = icons[plan.categoryName] || icons["default"];

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <CircularProgress
          size={70}
          width={6}
          fill={progressPercentage}
          tintColor="#4CAF50"
          backgroundColor="#e0e0e0"
        />
        {/* Ikon megjelenítése a kör közepén */}
        <Image source={iconSource} style={styles.icon} />
      </View>
      <Text style={styles.text}>{plan.categoryName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  progressContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    width: 34,
    height: 34,
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PlanProgress;
