import { View, Text, Button, StyleSheet, Image, ActivityIndicator, FlatList } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import React, { useEffect, useState } from "react";
import { fetchHome } from "../../service/Fetching"
import { HomeData } from "../../models/Home";
import PlanProgress from "../../components/PlanProgress";
import QuestItem from "../../components/QuestItem";

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
  const base_image_url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <View style={styles.container}>
      {/* Felhasználói információk */}
      <View style={styles.header_container}>
        <Image source={{ uri: base_image_url }} style={styles.profileImage} />
        <View>
          <Text style={styles.title}>Welcome {user.firstName} {user.lastName}</Text>
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
      <FlatList
        data={quests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <QuestItem quest={item} />}
        contentContainerStyle={styles.questsContainer}
      />

      {/* Make a Plan gomb */}
      <CustomButton title="Make a Plan" onPress={() => router.push("/(stack)/planner")} />
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
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
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
