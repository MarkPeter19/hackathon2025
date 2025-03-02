import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import CustomButton from "./CustomButton";

import { Quest } from "../models/Home";

interface PracticeModalProps {
  visible: boolean;
  onClose: () => void;
  onStart: () => void;
  duration: string;
  description: string;
  quest: Quest;
}

const PracticeModal: React.FC<PracticeModalProps> = ({
  visible,
  onClose,
  onStart,
  duration,
  description,
  quest,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Start Practice Quest</Text>
          <Text style={styles.modalText}>Quest: {description}</Text>
          <Text style={styles.duration}>Duration: {duration}</Text>
          <Text style={styles.xpText}>Reward: {quest.xpLevel} XP</Text>

          {/* Gombok */}
          <View style={styles.buttonContainer}>
            <CustomButton title="Start" onPress={onStart} />
            <CustomButton title="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "85%",
    height: "50%",
    padding: 25,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 15,
    textAlign: "center",
  },
  xpText: {
    fontSize: 18,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 20,
  },
  duration: {
    fontSize: 18,
    color: "#d9534f",
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "column",
    alignItems:"center",
    gap: 10, // Távolság a gombok között
  },
});

export default PracticeModal;
