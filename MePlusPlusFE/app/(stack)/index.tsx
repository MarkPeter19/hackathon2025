import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import React, { useEffect, useState } from "react";
import PlanProgress from "../../components/PlanProgress";
import QuestList from "@/components/QuestList";
import { CircularProgress } from "react-native-circular-progress";
import { useHome } from "../../context/HomeContext";

export default function HomeScreen() {
  const router = useRouter();
  const { homeData, loading, refreshHomeData } = useHome();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!homeData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 18, color: "red" }}>Error loading data</Text>
      </View>
    );
  }

  const { user, plans, quests } = homeData;
  const base_image_url =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  // // Calculate user XP percentage for the progress circle
  // // Assuming XP level is between 0 and 100, adjust as needed
  const userXpPercentage = user.xpLevel / 1000;

  return (
    <View style={styles.container}>
      {/* Felhasználói információk */}
      <View style={styles.header_container}>
        <View style={styles.profileContainer}>
          <CircularProgress
            size={70}
            width={6}
            fill={userXpPercentage * 100}
            tintColor="#4CAF50"
            backgroundColor="#e0e0e0"
            rotation={0}
          />
          <Image source={{ uri: base_image_url }} style={styles.profileImage} />
        </View>
        <View>
          <Text style={styles.title}>
            Welcome {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.xpText}>XP Level: {user.xpLevel}</Text>
          <TouchableOpacity
            style={styles.leaderboardButton}
            onPress={() => router.push("/(stack)/leaderboard")}
          >
            <Image
              source={require("../../assets/images/icons/podium.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Show Leaderboard gomb */}
      {/* <CustomButton title="Show Leaderboard" onPress={() => router.push("/leaderboard")} /> */}

      {/* Plans megjelenítése */}
      <FlatList
        horizontal
        data={plans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PlanProgress plan={item} />}
        contentContainerStyle={styles.plansContainer}
      />

      {/* Quests megjelenítése */}
      <QuestList quests={quests} />

      {/* Make a Plan gomb */}
      <CustomButton
        title="Make a Plan"
        onPress={() => router.push("/(stack)/planner")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  header_container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
  profileContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileImage: {
    position: "absolute",
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  xpText: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  plansContainer: {
    marginVertical: 20,
  },
  questsContainer: {
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
