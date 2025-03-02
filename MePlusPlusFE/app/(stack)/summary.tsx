import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import SummaryPart from "@/components/SummaryPart";
import { SummaryPartProps } from "@/models/SummaryPart";
import { postQuizAnswers } from "@/service/Fetching";
import CompletionModal from "@/components/CompletionModal"; 

export default function SummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [summary, setSummary] = useState<SummaryPartProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false); 

  useEffect(() => {
    if (params.answers) {
      console.log(params.answers);
      setLoading(true);
      try {
        const userAnswers = JSON.parse(params.answers as string);
        postQuizAnswers(userAnswers)
          .then((response: React.SetStateAction<SummaryPartProps[]>) => {
            setSummary(response);
            setLoading(false);
          })
          .catch((error: any) => {
            console.error("Failed to submit answers:", error);
            setLoading(false);
          });
      } catch (error) {
        console.error("Error parsing answers:", error);
        setLoading(false);
      }
    }
  }, [params.answers]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading results...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
      >
        {summary.map((one_summary, index) => (
          <SummaryPart
            key={index}
            question={one_summary.question}
            userAnswer={one_summary.userAnswer}
            correctAnswer={one_summary.correctAnswer}
          />
        ))}
      </ScrollView>

      {/* 🔹 CompletionModal */}
      <CompletionModal
        visible={showCompletionModal}
        onClose={() => {
          setShowCompletionModal(false);
          router.push("/"); 
        }}
      />

      <View style={styles.buttonContainer}>
        <CustomButton title="Back to Home" onPress={() => setShowCompletionModal(true)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
  },
});

