import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";
import { useHome } from "../context/HomeContext"; // Hozzáadva a globális állapotkezelés

interface CompletionModalProps {
  visible: boolean;
  xp?: string;
  onClose: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  visible,
  xp,
  onClose,
}) => {
  const router = useRouter();
  const { refreshHomeData } = useHome(); // Hozzáadva a frissítés funkciót

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>🎉 Well done! 🎉</Text>
          <Text style={styles.modalText}>
            You have completed your practice session!
          </Text>
          <Text style={styles.xpText}>🏆 +{xp} XP earned</Text>
          <CustomButton
            title="Go to Home"
            onPress={() => {
              refreshHomeData(); // Home adatokat frissítjük!
              onClose();
              router.replace("/");
            }}
          />
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
    width: "80%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignItems: "center",
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
  xpText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default CompletionModal;
