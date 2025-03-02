import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useHome } from "@/context/HomeContext";

// Definiáljuk a felhasználói adat típust
interface User {
  id: string;
  name: string;
  xpLevel: number;
}

// Dummy felhasználók + az aktuális user
const dummyUsers: User[] = [
  { id: "1", name: "John Doe", xpLevel: 350 },
  { id: "2", name: "Jane Smith", xpLevel: 500 },
  { id: "3", name: "Chris Evans", xpLevel: 700 },
  { id: "5", name: "Emily Johnson", xpLevel: 900 },
];

export default function LeaderboardScreen() {
  const router = useRouter();
  const { homeData } = useHome();
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  useEffect(() => {
    if (homeData?.user) {
      const currentUser = {
        id: "4",
        name: `${homeData.user.lastName}`,
        xpLevel: homeData.user.xpLevel,
      };

      // Összekombináljuk a dummy felhasználókkal
      const combinedUsers = [...dummyUsers, currentUser];

      // Rangsorolás XP szerint csökkenő sorrendben
      const sorted = combinedUsers.sort((a, b) => b.xpLevel - a.xpLevel);
      setSortedUsers(sorted);
    }
  }, [homeData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      {/* Táblázat fejléce */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, styles.rankColumn]}>#</Text>
        <Text style={[styles.tableCell, styles.nameColumn]}>Name</Text>
        <Text style={[styles.tableCell, styles.xpColumn]}>XP</Text>
      </View>

      {/* Felhasználói sorok */}
      {sortedUsers.map((item, index) => (
        <View key={item.id} style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.rankColumn]}>{index + 1}</Text>
          <View style={styles.userContainer}>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              }}
              style={styles.profileImage}
            />
            <Text style={[styles.tableCell, styles.nameColumn]}>{item.name}</Text>
          </View>
          <Text style={[styles.tableCell, styles.xpColumn]}>{item.xpLevel}</Text>
        </View>
      ))}

      <CustomButton title="Back to Home" onPress={() => router.replace("/")} />
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: "100%",
    borderRadius: 8,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  tableCell: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  rankColumn: {
    width: 40,
  },
  nameColumn: {
    flex: 1,
    textAlign: "left",
    paddingLeft: 10,
  },
  xpColumn: {
    width: 60,
    textAlign: "right",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
});
