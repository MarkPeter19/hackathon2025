import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import CustomButton from "./CustomButton";

interface ExitConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onExit: () => void;
  message?: string;
}

const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({
  visible,
  onCancel,
  onExit,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>⚠️ Are you sure?</Text>
          <Text style={styles.modalText}>
            Leaving now will cancel your progress.
          </Text>
          {/* Gombok */}
          <View style={styles.buttonContainer}>
            <CustomButton title="Continue Practice" onPress={onCancel} />
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
    height: "40%",
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

export default ExitConfirmationModal;
