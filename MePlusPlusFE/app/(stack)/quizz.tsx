import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlipCard, UserResponse } from "@/models/FlipCard";
import { fetchFlipCards } from "@/service/Fetching";

export default function QuizzScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<UserResponse[]>([]);
  const [quizData, setQuizData] = useState<FlipCard[] | null>(null);

  useEffect(() => {
      fetchFlipCards().then((data) => {
          console.log(data);
          setQuizData(data);
      });
  }, []);

  const handleAnswer = (answer: string) => {

    if (!quizData) {
      return;
    }

    setSelectedAnswers(prevAnswers => [...prevAnswers, { flipCardId: quizData[currentQuestion].id, userAnswer: answer }]);

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        router.push({
          pathname: "/(stack)/summary",
          params: { answers: JSON.stringify(selectedAnswers) },
        });
        // Here will go the API call to send the answers to the server
        // and get the results back on a new screen
      }
    }, 100);
  };

  if (!quizData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questione}>{quizData[currentQuestion].question}</Text>
      </View>
        <TouchableOpacity style={styles.answerButton} onPress={() => handleAnswer(quizData[currentQuestion].answerOne)}>
          <Text style={styles.answerText}>{quizData[currentQuestion].answerOne}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.answerButton} onPress={() => handleAnswer(quizData[currentQuestion].answerTwo)}>
          <Text style={styles.answerText}>{quizData[currentQuestion].answerTwo}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.answerButton} onPress={() => handleAnswer(quizData[currentQuestion].correctAnswer)}>
          <Text style={styles.answerText}>{quizData[currentQuestion].correctAnswer}</Text>
        </TouchableOpacity>
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
  questione: {
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
