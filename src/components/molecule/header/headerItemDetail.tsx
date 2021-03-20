import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../assets/theme/light';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';

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
        <IonIcon name="arrow-back" size={25} />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <IonIcon name="search" size={24} />
        <TextInput
          style={styles.textInput}
          placeholder={data?.recomendation || 'Cari makanan'}
        />
      </View>
      <View style={styles.navIcon}>
        <IonIcon
          style={styles.iconStyle}
          name="heart"
          size={25}
          color={Colors.gray}
        />
        <TouchableOpacity
          onPress={() => navigation.push('main', {screen: 'cart'})}>
          <IonIcon
            name="cart-outline"
            style={styles.iconStyle}
            size={25}
            color={Colors.gray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default headerItemDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 10,
    backgroundColor: Colors.gray7,
    elevation: 2,
    width,
    zIndex: 999,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  backContainer: {marginRight: 10, borderRadius: 999, padding: 5},
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: Colors.gray7,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconStyle: {
    textShadowColor: '#ababab',
    textShadowRadius: 1,
    textShadowOffset: {height: 0.4, width: 0.4},
  },
});
