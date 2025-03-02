import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, AppState } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Svg, { Circle } from "react-native-svg";
import CustomButton from "@/components/CustomButton";
import CompletionModal from "@/components/CompletionModal";
import ExitConfirmationModal from "@/components/ExitModal";

// Assume updateUserXp is imported from your API utility
import { updateUserXp } from "@/service/Fetching";
import FailConfirmationModal from "@/components/FailConfirmationModal";

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const PracticeTimer = () => {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const router = useRouter();
  const { duration = "0", description = "Unknown", xp = "0" } = useLocalSearchParams();
  const xpValue = Array.isArray(xp) ? xp[0] : xp.toString();

  const timeInSeconds = parseInt(Array.isArray(duration) ? duration[0] : duration) * 60;
  const [timeLeft, setTimeLeft] = useState(timeInSeconds);
  const [appActive, setAppActive] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && appActive) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft <= 1) {
      updateUserXp(4, Math.round(parseInt(xpValue) / 2))
        .then(() => console.log("XP updated successfully"))
        .catch((error) => console.error("Failed to update XP:", error));
      setShowCompleteModal(true);
    }
    return () => clearInterval(timer);
  }, [timeLeft, appActive]);

  // Figyeli az alkalmazás állapotát (aktív / háttérben van)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState !== "active") {
        setAppActive(false);
        setShowFailModal(true);
      } else {
        setAppActive(true);
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const progress = (timeLeft / timeInSeconds) * 100;
  const radius = 90;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 + progress / 100);

  const getProgressColor = () => {
    if (progress > 50) return "#28a745";
    if (progress > 25) return "#ffc107";
    return "#dc3545";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.xpText}>Reward: {xp} XP</Text>

      <View style={styles.timerContainer}>
        <Svg width={200} height={200} viewBox="0 0 200 200">
          <Circle cx="100" cy="100" r={radius} stroke="#e0e0e0" strokeWidth={strokeWidth} fill="none" />
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
            transform="rotate(-90 100 100)"
          />
        </Svg>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      </View>

      <CustomButton title="End Practice" onPress={() => setShowExitModal(true)} />

      <CompletionModal visible={showCompleteModal} xp={xpValue} onClose={() => router.replace("/")} />
      <ExitConfirmationModal visible={showExitModal} onCancel={() => setShowExitModal(false)} onExit={() => router.replace("/")} />
      <FailConfirmationModal visible={showFailModal} onExit={() => router.replace("/")} message="Practice failed. You left the screen!" />
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
    marginBottom: 20,
    marginTop: -40,
  },
  description: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
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
