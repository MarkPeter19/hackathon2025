import { Stack } from "expo-router";
import React from "react";
import { HomeProvider } from "../../context/HomeContext";

export default function StackLayout() {
  return (
    <HomeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerBackVisible: false,
            gestureEnabled: false,
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
