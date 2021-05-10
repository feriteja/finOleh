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
import IconFeather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import Colors from '../../../assets/theme/light';

const {height, width} = Dimensions.get('window');
const headerFavorite: React.FC = () => {
  const cart = useSelector((state) => state.cart);
  const {auth} = useSelector((state) => state.auth);

  const navigationHandler = () => {
    auth ? navigation.navigate('cart') : navigation.navigate('profile');
  };

  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>WishList</Text>

      <Pressable style={{width: 30}} onPress={() => navigationHandler()}>
        <Text
          style={{
            position: 'absolute',
            padding: 3,
            borderRadius: 999,
            backgroundColor: Colors.primary3,
            right: 0,
            top: -10,
            fontSize: 11,
            zIndex: 900,
          }}>
          {cart.length}
        </Text>
        <IconFeather name="shopping-bag" size={25} />
      </Pressable>
    </View>
  );
};

export default headerFavorite;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    height: 50,
    // width,
    zIndex: 999,
    paddingHorizontal: 10,
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
