import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";

// Dummy kérdések és válaszok
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

export default function QuizzScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleAnswer = (index: number) => {
    setSelectedAnswers(prevAnswers => [...prevAnswers, index]);

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        router.push({
          pathname: "/(stack)/summary",
          params: { selectedAnswers: JSON.stringify([...selectedAnswers, index]) },
        });
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
    backgroundColor: "#f9f9f9",
  },
  questionContainer: {
    backgroundColor: "#f1f1f1",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  question: {
    fontSize: 18,
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
    fontSize: 16,
    fontWeight: "bold",
  },
});
