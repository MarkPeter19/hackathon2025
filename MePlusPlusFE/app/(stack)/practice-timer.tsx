import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Svg, { Circle } from "react-native-svg";
import CustomButton from "@/components/CustomButton";

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const PracticeTimer = () => {
  const router = useRouter();
  const { duration = "0", description = "Unknown", xp = "0" } = useLocalSearchParams();

  // Konvertáljuk a percben kapott `duration` értéket másodpercekké
  const timeInSeconds = parseInt(Array.isArray(duration) ? duration[0] : duration) * 60;
  const [timeLeft, setTimeLeft] = useState(timeInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Progress kiszámítása (0-100% közötti érték)
  const progress = (timeLeft / timeInSeconds) * 100;
  const radius = 90;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 + progress / 100); // Progress visszafelé csökken

  // Progress színének meghatározása dinamikusan
  const getProgressColor = () => {
    if (progress > 50) return "#28a745"; // Zöld
    if (progress > 25) return "#ffc107"; // Sárga
    return "#dc3545"; // Piros
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.xpText}>Reward: {xp} XP</Text>

      {/* Circular Timer */}
      <View style={styles.timerContainer}>
        <Svg width={200} height={200} viewBox="0 0 200 200">
          {/* Háttér kör */}
          <Circle cx="100" cy="100" r={radius} stroke="#e0e0e0" strokeWidth={strokeWidth} fill="none" />
          {/* Animált progress kör */}
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke={getProgressColor()}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)" // Itt indul a tetején, és jobbra csökken visszafelé
          />
        </Svg>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      </View>

      {/* End Practice gomb */}
      <CustomButton title="End Practice" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20, // Nagyobb térköz a cím alatt
    marginTop: -40, // Cím fentebb hozva
  },
  descriptionContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    width: "85%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  description: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 6,
  },
  duration: {
    fontSize: 18,
    color: "#7D8B97",
    fontWeight: "500",
    marginBottom: 6,
  },
  xpText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  timerContainer: {
    width: 220,
    height: 220,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  timer: {
    position: "absolute",
    fontSize: 34,
    fontWeight: "bold",
    color: "#2C3E50",
  },
});

export default PracticeTimer;
