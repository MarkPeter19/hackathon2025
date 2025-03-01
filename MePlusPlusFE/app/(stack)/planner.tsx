import { View, Text, Button, StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { fetchPlans } from "@/service/Fetching";
import React from "react";


export default function PlannerScreen() {
  const router = useRouter();
  const url  = "";

  useEffect(() => {
    fetchPlans().then((data) => {
      console.log(data);
    });
    
  }, []);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a plan type</Text>
      <CustomButton 
        title="Add Code Practice" 
        onPress={() => router.push("/(stack)/select/code")} 
      />
      <CustomButton 
        title="Select Sport Activity" 
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
