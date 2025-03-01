import { View, Text, Button, StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { fetchPlans } from "@/service/Fetching";
import { useState } from "react";
import { Plan } from "@/models/Plan";
import React from "react";

export default function PlannerScreen() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    fetchPlans()
      .then((data) => setPlans(data))
      .then(() => console.log(plans))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a plan type</Text>
      <Text
        style={{ alignSelf: "flex-start", marginLeft: 20, fontWeight: "bold" }}
      >
        Programming
      </Text>
      <CustomButton
        title="+"
        onPress={() => router.push("/(stack)/select/code")}
      />
      <Text
        style={{ alignSelf: "flex-start", marginLeft: 20, fontWeight: "bold" }}
      >
        Sport
      </Text>
      <CustomButton
        title="+"
        onPress={() => router.push("/(stack)/select/sport")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20, // Gombok közti távolság
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
