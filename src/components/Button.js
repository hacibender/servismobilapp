import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind'; 

const Button = ({ title, onPress, variant = 'primary' }) => { 
  return (
    <TouchableOpacity style={[styles.button, styles[variant]]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = NativeWindStyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold',
  },
  primary: { 
    backgroundColor: 'blue', 
  },
  secondary: { 
    backgroundColor: 'gray', 
  },
  // ... more variants
});

export default Button;