import { Stack } from "expo-router";
import React from "react";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="planner" options={{ title: "Planner" }} />
      <Stack.Screen name="select/[type]" options={{ title: "Select" }} />
    </Stack>
  );
}
