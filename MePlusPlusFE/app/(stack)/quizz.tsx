import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";

// Dummy kérdések és válaszok
const quizData = [
  {
    question: "Ez le a kérdés amit kérdez az AI?",
    answers: ["első válasz", "második válasz", "harmadik válasz"]
  },
  {
    question: "Ez is egy kérdés?",
    answers: ["első válasz", "második válasz", "harmadik válasz"]
  },
  {
    question: "Ez is egy kérdés?",
    answers: ["első válasz", "második válasz", "harmadik válasz"]
  },
];

export default function QuizzScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleAnswer = (index: number) => {
    setSelectedAnswers(prevAnswers => [...prevAnswers, "temp"]);

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        router.push({pathname: "/(stack)/summary",});
        // Here will go the API call to send the answers to the server
        // and get the results back on a new screen
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{quizData[currentQuestion].question}</Text>
      </View>
      {quizData[currentQuestion].answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={styles.answerButton}
          onPress={() => handleAnswer(index)}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  questionContainer: {
    backgroundColor: "#f1f1f1",
    flex: 1,
    height: 20,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  question: {
    fontWeight: "bold",
    textAlign: "center",
  },
  answerButton: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    alignItems: "center",
  },
  answerText: {
    fontWeight: "bold",
  },
});
