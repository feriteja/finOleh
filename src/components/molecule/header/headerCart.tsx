import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('screen');

const headerCart = () => {
  const {auth} = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const navigationHandler = () => {
    auth ? navigation.navigate('favorite') : navigation.navigate('profile');
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Cart</Text>
      <Pressable
        style={{position: 'absolute', bottom: 5, right: 10}}
        onPress={() => navigationHandler()}>
        <IonIcon name="heart-outline" size={25} />
      </Pressable>
    </View>
  );
};

export default headerCart;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    height: 50,
    width,
    zIndex: 999,
    paddingHorizontal: 10,
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
