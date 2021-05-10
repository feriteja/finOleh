import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Colors from '../../../assets/theme/light';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import {color} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

interface Props {
  data?: any;
}

const headerItemDetail: React.FC<Props> = ({data}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backContainer}>
        <IonIcon
          name="arrow-back"
          size={25}
          style={styles.iconStyle}
          color={Colors.gray7}
        />
      </TouchableOpacity>
      <View style={styles.navIcon}>
        <Pressable onPress={() => navigation.navigate('favorite')}>
          <IonIcon
            style={[styles.iconStyle]}
            name="heart"
            size={25}
            color={Colors.gray7}
          />
        </Pressable>
        <TouchableOpacity
          onPress={() => navigation.push('main', {screen: 'cart'})}>
          <IonIcon
            name="cart-outline"
            style={styles.iconStyle}
            size={25}
            color={Colors.gray7}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default headerItemDetail;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',
    width,
    zIndex: 999,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  backContainer: {marginRight: 10, borderRadius: 999, padding: 5},
  inputContainer: {
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  textInput: {
    width: 230,
    height: 30,
    padding: 0,
    marginLeft: 5,
    alignSelf: 'baseline',
  },
  navIcon: {
    flexDirection: 'row',
    height: 40,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconStyle: {
    textShadowColor: '#000',
    textShadowOffset: {height: 1, width: 1},
    textShadowRadius: 5,
  },
});
