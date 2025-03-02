import { Stack, useRouter } from "expo-router";
import React from "react";
import { HomeProvider } from "../../context/HomeContext";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default function StackLayout() {
  const router = useRouter();

  return (
    <HomeProvider>
      <Stack>
        <Stack.Screen name="leaderboard" options={{ title: "Leaderboard" }} />
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerBackVisible: false,
            gestureEnabled: true,
            headerRight: () => (
              <TouchableOpacity
                style={styles.leaderboardButton}
                onPress={() => router.push("/(stack)/leaderboard")}
              >
                <Image source={require("../../assets/images/icons/podium.png")} style={styles.icon} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="planner" options={{ title: "Planner" }} />
        <Stack.Screen name="select/[type]" options={{ title: "Select" }} />
        <Stack.Screen name="quizz" options={{ title: "Quiz" }} />
        <Stack.Screen
          name="summary"
          options={{
            title: "Summary",
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="practice-timer"
          options={{ title: "Practice Timer" }}
        />
      </Stack>
    </HomeProvider>
  );
}

const styles = StyleSheet.create({
  leaderboardButton: {
    marginRight: 15,
    padding: 8,
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
});
