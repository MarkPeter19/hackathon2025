import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React from "react";
import CustomButton from "@/components/CustomButton";
import SummaryPart from "@/components/SummaryPart";

// Dummy kérdések és válaszok (ugyanazok, mint a quizz.tsx-ben)
const quizData = [
  {
    question: "Ez le a kérdés amit kérdez az AI?",
    yourAnswer: "második válasz",
    correctAnswer: "második válasz",
    explanation: "Ez egy magyarázó szöveg a helyes válaszhoz.",
  },
  {
    question: "Ez is egy kérdés1?",
    yourAnswer: "első válasz",
    correctAnswer: "második válasz",
    explanation: "Ez egy magyarázó szöveg a helyes válaszhoz.",
  },
  {
    question: "Ez is egy kérdés2?",
    yourAnswer: "első válasz",
    correctAnswer: "második válasz",
    explanation: "Ez egy magyarázó szöveg a helyes válaszhoz.",
  },
  {
    question: "Ez is egy kérdés2?",
    yourAnswer: "első válasz",
    correctAnswer: "második válasz",
    explanation: "Ez egy magyarázó szöveg a helyes válaszhoz.",
  },
];

export default function SummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
      >
        {quizData.map((quizData, index) => (
          <SummaryPart
            key={index}
            question={quizData.question}
            answer={quizData.yourAnswer}
            correctAnswer={quizData.correctAnswer}
            explanation={quizData.explanation}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton title="Back to Home" onPress={() => router.push("/")} />
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
