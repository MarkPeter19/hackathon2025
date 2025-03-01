import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SummaryPartProps } from "@/models/SummaryPart";
import FontAwsome from "react-native-vector-icons/FontAwesome";



function SummaryPart(props: SummaryPartProps) {
    return (
        <View style={styles.container}>
            {props.userAnswer == props.correctAnswer ? (
                <View>
                    <Text style={[styles.question, styles.placeholder]}>{props.question}</Text>
                    <Text style={[styles.correct_answer, styles.placeholder, { marginLeft: 5 }]}>
                        {props.userAnswer}
                        <FontAwsome name="check" size={20} color="green" alignSelf="flex-end" />
                    </Text>
                </View>
            ) : (
                <View>
                    <Text style={[styles.question, styles.placeholder]}>{props.question}</Text>
                    <Text style={[styles.wrong_answer, styles.placeholder]}>
                        {props.userAnswer}
                        <FontAwsome name="close" size={20} color="red" alignSelf="flex-end" />
                    </Text>
                    <Text style={[styles.correct_answer, styles.placeholder]}>
                        {props.correctAnswer}
                        {"\n\nExplantion:\n"}
                        {/* {props.explanation} */}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
    },

    placeholder: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },

    correct_answer: {
        backgroundColor: "#e0f7e1",
    },
    wrong_answer: {
        backgroundColor: "#f3cad2",
    },
    question: {
        fontWeight: "bold",
    },
    answer: {
        fontSize: 16,
        color: "gray",
    },
    
});

export default SummaryPart;