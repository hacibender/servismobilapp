import React from 'react';
import { View } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind'; 

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = NativeWindStyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, 
    marginBottom: 10, 
  },
});

export default Card;