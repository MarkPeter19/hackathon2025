import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import CustomButton from "./CustomButton";

interface FailConfirmationModalProps {
  visible: boolean;
  onExit: () => void;
  message: string;
}

const FailConfirmationModal: React.FC<FailConfirmationModalProps> = ({
  visible,
  onExit,
  message,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>You exited!</Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <CustomButton title="Exit" onPress={onExit} />
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
    width: "65%",
    height: "30%",
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
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 10, // Távolság a gombok között
  },
});

export default FailConfirmationModal;
