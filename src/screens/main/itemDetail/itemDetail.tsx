import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Gap, HeaderItemDetail} from '../../../components/';
import {useDispatch} from 'react-redux';
import {addCartItem} from '../../../config/redux/actions/cartHandler';
import {addToFavorite} from '../../../config/redux/actions/favoriteHandler';
import IonIcon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import Colors from '../../../assets/theme/light';

interface item {
  name: string;
  price: number;
  originalPrice: number;
  img: string;
  shop: {
    lat: number;
    location: string;
    name: string;
    lng: number;
    shopRef: string;
    shopUID: string;
  };
  ref: string;
  uid: string;
}

const {height, width} = Dimensions.get('window');

const itemDetail = ({route, navigation}: any) => {
  const item: item = route.params.item;

  const dispatch = useDispatch();

  const rateDiscount = Math.round(
    ((item.originalPrice - item.price) / item.originalPrice) * 100,
  );

  return (
    <View style={styles.container}>
      <HeaderItemDetail />
      <Image
        source={{
          uri: item.img,
        }}
        style={styles.img}
      />
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.textPrice}>Rp. {item.price}</Text>
          <TouchableOpacity onPress={() => dispatch(addToFavorite(item))}>
            <IonIcon name="heart-outline" color={'#444'} size={25} />
          </TouchableOpacity>
        </View>
        <Gap height={10} />
        <View style={styles.discountContainer}>
          <Text style={styles.rateDiscount}>{rateDiscount}%</Text>
          <Text style={styles.textDiscount}>Rp. {item.originalPrice}</Text>
        </View>
        <Gap height={10} />
        <Text style={styles.textTitle}>{item.name}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.shopInfoContainer}>
        <View style={styles.iconContainer}>
          <IconFeather name="shopping-bag" size={45} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 10,
          }}>
          <Text>{item.shop.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IonIcon name="location-outline" size={15} />
            <Text style={{textTransform: 'capitalize'}}>
              {item.shop.location}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.buttonAction}>
          <Text style={[styles.buttonActionText, {color: Colors.success}]}>
            Buy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            dispatch(
              addCartItem({
                uid: item.uid,
                ref: item.ref,
                shop: item.shop,
                data: item,
              }),
            )
          }
          style={[styles.buttonAction, {backgroundColor: Colors.success}]}>
          <Text style={[styles.buttonActionText, {color: Colors.gray7}]}>
            + Save to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default itemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {paddingHorizontal: 10, paddingVertical: 15},
  img: {
    height: 300,
    width: undefined,
    resizeMode: 'cover',
  },
  textPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  discountContainer: {flexDirection: 'row'},
  textDiscount: {
    color: '#888',
    fontSize: 14,
    marginLeft: 5,
    textDecorationLine: 'line-through',
  },
  rateDiscount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary3,
    backgroundColor: Colors.primary7,
    padding: 2,
    borderRadius: 3,
  },
  textTitle: {fontSize: 17},
  separator: {
    height: 5,
    backgroundColor: Colors.gray3,
  },
  shopInfoContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  iconContainer: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 999,
    alignItems: 'center',
  },
  bottomAction: {
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.gray3,
    bottom: 0,
    width,
    height: 60,
    justifyContent: 'space-evenly',
  },
  buttonAction: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: Colors.success,
    width: width / 2 - 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  },
  buttonActionText: {
    fontWeight: 'bold',
  },
});
