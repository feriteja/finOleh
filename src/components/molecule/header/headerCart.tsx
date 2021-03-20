import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');

const headerCart = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Cart</Text>
      <IonIcon name="heart" size={25} />
    </View>
  );
};

export default headerCart;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    height: 50,
    width,
    alignSelf: 'stretch',
    zIndex: 999,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
