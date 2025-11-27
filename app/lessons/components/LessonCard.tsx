import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface LessonCardProps {
  title: string;
  image?: any;
  icon?: string;
  onPress?: () => void;
}

export default function LessonCard({ title, image, icon, onPress }: LessonCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
    textAlign: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 12,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
