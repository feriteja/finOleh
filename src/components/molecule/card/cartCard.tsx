import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ImageURISource,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import Colors from '../../../assets/theme/light';
import {
  updateCountCart,
  deleteCartItem,
} from '../../../config/redux/actions/cartHandler';
import {moveToFavorite} from '../../../config/redux/actions/favoriteHandler';

interface item {
  name: string;
  price: number;
  originalPrice: number;
  img: string;
  number: number;
  uid: string;
  shop: {
    lat: number;
    lng: number;
    location: string;
    name: string;
  };
}

interface Props {
  item: item;
}

const cartCard: React.FC<Props> = ({item}) => {
  const [numItem, setNumItem] = useState<number>(item.number);

  const rate = useCallback(() => {
    const dist = item.originalPrice - item.price;
    const getRate = (dist / item.originalPrice) * 100;
    return Math.round(getRate);
  }, [item]);

  const numItemHandler = (type: string) => {
    if (type == 'plus') {
      setNumItem((a) => {
        const resCount = a + 1;
        dispatch(
          updateCountCart({uidItem: item.uid, type: 'min', number: resCount}),
        );
        return resCount;
      });
    } else if (type == 'min') {
      setNumItem((a) => {
        const resCount = a - 1;
        dispatch(
          updateCountCart({uidItem: item.uid, type: 'min', number: resCount}),
        );
        return resCount;
      });
    }
  };

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteCartItem({uidItem: item.uid}));
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.textShop}>{item.shop.name}</Text>
      <Text>{item.shop.location}</Text>
      <View style={styles.cardContent}>
        <Image source={{uri: item.img}} style={styles.cardImage} />
        <View style={styles.cardItemInfo}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textTitle}>
            {item.name}
          </Text>
          {item.price !== item.originalPrice && (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rateDiscount}>{rate()}%</Text>
              <Text style={styles.textOriginalPrice}>
                Rp. {item.originalPrice}
              </Text>
            </View>
          )}
          <Text style={styles.textPrice}>Rp. {item.price}</Text>
        </View>
      </View>
      <View style={styles.cardOption}>
        <TouchableOpacity
          onPress={() => dispatch(moveToFavorite({itemUid: item.uid}))}>
          <Text style={styles.moveWishL}>Move to Wishlist</Text>
        </TouchableOpacity>
        <View style={styles.cardOptionButton}>
          <TouchableOpacity onPress={() => onDelete()}>
            <IconFeather
              name="trash-2"
              size={20}
              style={{paddingHorizontal: 4}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={numItem == 0}
            onPress={() => numItemHandler('min')}>
            <IconFeather
              name="minus-circle"
              size={20}
              style={{paddingHorizontal: 4}}
            />
          </TouchableOpacity>
          <TextInput
            value={numItem.toString()}
            editable={false}
            textAlign="center"
            style={{padding: 0, margin: 0, paddingHorizontal: 5, color: '#000'}}
          />
          <TouchableOpacity onPress={() => numItemHandler('plus')}>
            <IconFeather
              name="plus-circle"
              size={20}
              style={{paddingHorizontal: 4}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default cartCard;

const styles = StyleSheet.create({
  textShop: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  textOriginalPrice: {
    color: '#a0a0a0',
    fontSize: 13,
    marginLeft: 5,
    textDecorationLine: 'line-through',
  },
  textTitle: {fontSize: 15},
  textPrice: {fontWeight: 'bold'},
  moveWishL: {
    color: '#888',
    fontSize: 13,
  },
  rateDiscount: {
    fontSize: 11,
    color: Colors.primary3,
    backgroundColor: Colors.primary6,
    padding: 2,
    borderRadius: 3,
  },
  cardContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: '#aaa',
    borderRadius: 7,
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardItemInfo: {marginLeft: 10},
  cardImage: {
    height: 120,
    width: 120,
    borderRadius: 7,
  },
  cardOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    marginTop: 7,
    paddingHorizontal: 5,
  },
  cardOptionButton: {flexDirection: 'row', alignItems: 'center'},
});
