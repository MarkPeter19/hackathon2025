import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import React, { useEffect, useState } from "react";
import { fetchHome } from "../../service/Fetching";
import { HomeData } from "../../models/Home";
import PlanProgress from "../../components/PlanProgress";
import QuestList from "@/components/QuestList";
import QuestItem from "@/components/QuestItem";
import { CircularProgress } from "react-native-circular-progress";

export default function HomeScreen() {
  const router = useRouter();
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHome()
      .then((data) => {
        setHomeData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
        setLoading(false);
      });
  }, []);

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
  
  // Calculate user XP percentage for the progress circle
  // Assuming XP level is between 0 and 100, adjust as needed
  const userXpPercentage = user.xpLevel / 1000;

  return (
    <View style={styles.container}>
      {/* Felhasználói információk */}
      <View style={styles.header_container}>
        <View style={styles.profileContainer}>
          <CircularProgress
            size={70}
            width={6}
            fill={10}
            tintColor="#4CAF50"
            backgroundColor="#e0e0e0"
          />
          <Image source={{ uri: base_image_url }} style={styles.profileImage} />
        </View>
        <View>
          <Text style={styles.title}>
            Welcome {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.xpText}>XP Level: {user.xpLevel}</Text>
        </View>
      </View>

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
});
