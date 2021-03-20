import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageURISource,
  AccessibilityInfo,
  TouchableOpacity,
} from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import {Gap} from '../..';

import Colors from '../../../assets/theme/light';

interface Props {
  image: ImageURISource;
  name: string;
  balance: number;
  myFavorite: number;
}

const initialProps = {
  image: require('../../../assets/img/avatar/ava1.jpg'),
};

const profileInfo: React.FC<Props> = ({
  image = initialProps.image,
  name = 'Synfs Kolopo Saida',
  balance = 0,
  myFavorite = 0,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Gap height={60} />
      <View style={[styles.avatar, styles.avatarContainer]}>
        <Image source={image} style={styles.avatar} />
      </View>
      <Gap height={10} />
      <Text style={styles.nameText}>{name}</Text>
      <Gap height={10} />
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.numText}>Rp. {balance}</Text>
            <IconFontAwesome5
              style={{marginLeft: 5}}
              name="money-bill-wave"
              size={20}
              color={Colors.success}
            />
          </View>
          <Text>Balance</Text>
        </View>
        <View style={styles.cardContent}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.numText}>{myFavorite}</Text>
            <IconAntDesign
              name="heart"
              style={{marginLeft: 5}}
              size={20}
              color={Colors.primary3}
            />
          </View>
          <Text>My Favorite</Text>
        </View>
      </View>
    </View>
  );
};

export default profileInfo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 10,
  },
  avatar: {
    resizeMode: 'cover',
    height: 120,
    width: 120,
  },
  avatarContainer: {
    overflow: 'hidden',
    height: 100,
    width: 100,
    borderRadius: 20,
    elevation: 3,
  },
  nameText: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    width: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    // width: 100,
    // backgroundColor: Colors.gray7,
    // borderRadius: 20,
    // borderWidth: 0.4,
    // borderColor: Colors.gray5,
  },
  numText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
