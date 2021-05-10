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
import {useDispatch, useSelector} from 'react-redux';
import {addCartItem} from '../../../config/redux/actions/cartHandler';
import {addToFavorite} from '../../../config/redux/actions/favoriteHandler';
import IonIcon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import Colors from '../../../assets/theme/light';
import {item} from 'constants/types/dataTypes';

const {height, width} = Dimensions.get('window');

const itemDetail = ({route, navigation}: any) => {
  const item: item = route.params.item;

  const dispatch = useDispatch();

  const rateDiscount = Math.round(
    ((item.originalPrice - item.price) / item.originalPrice) * 100,
  );

  const favorite: [] = useSelector((state) => state.favorite);
  const cart: [] = useSelector((state) => state.cart);

  return (
    <View style={styles.container}>
      <HeaderItemDetail />
      <View
        style={{
          height: 300,
          backgroundColor: '#eaeaea',
        }}>
        <Image
          source={{
            uri: item.img,
          }}
          style={styles.img}
        />
      </View>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.textPrice}>{item.name}</Text>
          <TouchableOpacity onPress={() => dispatch(addToFavorite(item))}>
            {favorite.some((itemFav) => itemFav.uid == item.uid) ? (
              <IonIcon name="heart" color={'red'} size={25} />
            ) : (
              <IonIcon name="heart-outline" color={'#444'} size={25} />
            )}
          </TouchableOpacity>
        </View>
        <Gap height={10} />
        <View style={styles.discountContainer}>
          <Text style={styles.rateDiscount}>{rateDiscount}%</Text>
          <Text style={styles.textDiscount}>Rp. {item.originalPrice}</Text>
        </View>
        <Gap height={10} />
        <Text style={styles.textSubTitle}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
          reiciendis magni cumque quisquam fugiat natus velit iste ad alias? Ex
          unde, maiores doloremque iusto sapiente earum commodi cum vitae non
          asperiores labore? Perferendis rem itaque maxime a iste? Assumenda,
          voluptatibus.
        </Text>
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
          style={[
            styles.buttonAction,
            {
              backgroundColor: cart.some((itemSome) => itemSome.uid == item.uid)
                ? '#aaa'
                : Colors.success,
              borderColor: '#aaa',
            },
          ]}>
          {cart.some((itemSome) => itemSome.uid == item.uid) ? (
            <Text style={[styles.buttonActionText, {color: Colors.gray7}]}>
              ✓ added to cart
            </Text>
          ) : (
            <Text style={[styles.buttonActionText, {color: Colors.gray7}]}>
              + Save to cart
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default itemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {paddingHorizontal: 15, paddingVertical: 15},
  img: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  },
  textPrice: {
    fontSize: 24,
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

  textSubTitle: {
    fontSize: 14,
    // opacity: 0.8,
    color: '#333',
    letterSpacing: 1.1,
  },
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
