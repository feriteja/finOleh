import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {Gap} from '../../index';
import Colors from '../../../assets/theme/light';
import IonIcon from 'react-native-vector-icons/Ionicons';

interface Props {
  item: {
    name: string;
    price: number;
    originalPrice: number;
    img: string;
    shop: {
      lat: number;
      location: string;
      name: string;
      lng: number;
    };
    ref: string;
  };
}

const {height, width} = Dimensions.get('window');

const itemCard: React.FC<Props> = ({item}) => {
  const rateDiscount = Math.round(
    ((item.originalPrice - item.price) / item.originalPrice) * 100,
  );

  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: item.img}} style={{height: 120, width: undefined}} />
      <Gap height={4} />
      <View style={styles.cardContent}>
        <Text numberOfLines={2}>
          {item?.name || 'Dodol Garut Rasa Rujak Cuka Digulaan'}
        </Text>
        <Gap height={4} />
        {item.price < item.originalPrice && (
          <View style={styles.discountContainer}>
            <Text style={styles.rateDiscount}>{rateDiscount || 0}%</Text>
            <Text style={styles.textDiscount}>
              Rp. {item?.originalPrice || 0}
            </Text>
          </View>
        )}
        <Gap height={4} />
        <Text style={styles.textPrice}>Rp {item.price}</Text>

        <Gap height={5} />
        <View style={styles.cardLocation}>
          <IonIcon name="location-outline" size={16} />
          <Text style={styles.textLocation}>{item?.location || 'bandung'}</Text>
        </View>
      </View>
    </View>
  );
};

export default itemCard;

const styles = StyleSheet.create({
  cardContainer: {
    // height: 260,
    paddingBottom: 10,
    width: width / 2 - 30,
    borderRadius: 7,
    overflow: 'hidden',
    borderWidth: 0.8,
    borderColor: Colors.gray,
  },
  cardContent: {
    padding: 5,
    flex: 1,
  },
  cardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  rateDiscount: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.primary3,
    backgroundColor: Colors.primary7,
    padding: 2,
    borderRadius: 3,
  },
  textDiscount: {
    color: '#a0a0a0',
    fontSize: 11,
    marginLeft: 5,
    textDecorationLine: 'line-through',
  },
  textPrice: {
    fontWeight: 'bold',
  },
  textLocation: {
    textTransform: 'capitalize',
    fontSize: 12,
  },
});
