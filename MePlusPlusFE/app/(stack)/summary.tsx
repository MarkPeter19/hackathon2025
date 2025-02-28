import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React from "react";
import CustomButton from "@/components/CustomButton";

// Dummy kérdések és válaszok (ugyanazok, mint a quizz.tsx-ben)
const quizData = [
  {
    question: "Ez le a kérdés amit kérdez az AI?",
    answers: ["a) első válasz", "b) második válasz", "c) harmadik válasz"],
    correctIndex: 0,
  },
  {
    question: "Melyik évben jelent meg a React?",
    answers: ["a) 2017", "b) 2015", "c) 2013"],
    correctIndex: 2,
  },
  {
    question: "ssdfsdsdcsdcsd sdf sdfsd  sdcsd",
    answers: ["a) sdsd", "b) 2sds015", "c) asdas"],
    correctIndex: 1,
  },
];

export default function SummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const selectedAnswers = params.selectedAnswers
    ? JSON.parse(params.selectedAnswers as string)
    : [];

  const score = selectedAnswers.reduce(
    (acc: number, answer: number, index: number) =>
      answer === quizData[index as number].correctIndex ? acc + 1 : acc,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Summary</Text>
      {quizData.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{question.question}</Text>
          <Text
            style={[
              styles.answer,
              selectedAnswers[index] === question.correctIndex
                ? styles.correct
                : styles.incorrect,
            ]}
          >
            Your Answer: {question.answers[selectedAnswers[index]]}
          </Text>
          <Text style={styles.correctAnswer}>
            Correct Answer: {question.answers[question.correctIndex]}
          </Text>
        </View>
      ))}
      <Text style={styles.score}>
        Your Score: {score} / {quizData.length}
      </Text>
      <CustomButton 
          title="Back to Home" 
          onPress={() => router.replace("/")} 
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionContainer: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
  },
  answer: {
    fontSize: 16,
    marginTop: 5,
  },
  correctAnswer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  correct: {
    color: "green",
  },
  incorrect: {
    color: "red",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
