import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moneyFormat} from '../../../utils/functions/function';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIon from 'react-native-vector-icons/Ionicons';
import {Gap} from '../..';
import Colors from '../../../assets/theme/light';
import {useDispatch} from 'react-redux';
import {
  deleteFavorite,
  moveToCart,
} from '../../../config/redux/actions/favoriteHandler';

interface item {
  name: string;
  price: number;
  originalPrice: number;
  img: string;
  number: number;
  shop: {
    lat: number;
    location: string;
    name: string;
    lng: number;
  };
  uid: string;
}

interface props {
  item: item;
}

const favoriteCard: React.FC<props> = ({item}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardInfoContainer}>
        <Image source={{uri: item.img}} style={styles.imageCard} />
        <View style={styles.cardInfo}>
          <Text numberOfLines={2}>{item.name}</Text>
          <Text style={styles.textPrice}>
            Rp. {moneyFormat(item.originalPrice)}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <IconFeather name="shopping-bag" size={20} />
            <Text>{item.shop.name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <IconIon name="location-outline" size={18} />
            <Text style={{fontSize: 13}}>{item.shop.location}</Text>
          </View>
        </View>
      </View>
      <Gap height={5} />
      <View style={styles.cardAction}>
        <TouchableOpacity
          onPress={() => dispatch(deleteFavorite({itemUid: item.uid}))}
          style={styles.buttonDelete}>
          <IconFeather name="trash-2" size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(moveToCart({itemUid: item.uid}))}
          style={styles.buttonMoveToCart}>
          <Text style={{fontWeight: 'bold', color: Colors.success}}>
            Move to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default favoriteCard;

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 7,
    overflow: 'hidden',
  },
  cardInfoContainer: {flexDirection: 'row'},
  cardInfo: {
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  cardAction: {flexDirection: 'row', alignItems: 'center'},
  imageCard: {
    height: 100,
    width: 120,
  },
  textPrice: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonMoveToCart: {
    flex: 1,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.success,
  },
});
