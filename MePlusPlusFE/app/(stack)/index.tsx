import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import React from "react";

export default function HomeScreen() {
  const router = useRouter();
  const base_image_url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"; 

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Image source={{ uri: base_image_url }} style={{ width: 50, height: 50, borderRadius: 50 }} />
        <Text style={styles.title}>Welcome xyz</Text>
      </View>
      <View style={styles.content_container}>
      <CustomButton 
          title="Make a Plan" 
          onPress={() => router.push("/(stack)/planner")} 
        />
      </View>
      <CustomButton title="Test a Quizz" onPress={() => router.push("/(stack)/quizz")} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header_container: {
    width: "100%",
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonStyle: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content_container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

});
