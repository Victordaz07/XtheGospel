import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface RoleButtonProps {
  title: string;
  onPress: () => void;
}

const RoleButton: React.FC<RoleButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: 8,
    marginVertical: theme.spacing.sm,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.base,
    fontWeight: 'bold',
  },
});

export default RoleButton;