import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../../assets/theme/light';
import {HeaderCart, Gap, CartCard} from '../../../components/';

const {height, width} = Dimensions.get('window');

interface dataArrayIntf {
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
  navigation: any;
}

const cart: React.FC<Props> = ({navigation}) => {
  const dataCart: dataArrayIntf[] = useSelector((state) => state.cart);

  const getNumItem = () => {
    const getCountArr = dataCart.map((a) => a.number);
    const getCountTotal = getCountArr.reduce((a, b) => a + b, 0);
    return getCountTotal;
  };

  const getAllItemPrice = () => {
    const getCountArr = dataCart.map((a) => a.number * a.price);
    const getCountTotal = getCountArr.reduce((a, b) => a + b, 0);
    const moneyFormat = getCountTotal
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    return moneyFormat;
  };

  return (
    <View style={styles.container}>
      <HeaderCart />

      <ScrollView style={styles.content}>
        {dataCart.length != 0 ? (
          <FlatList
            keyExtractor={(a, index) => index.toString()}
            contentContainerStyle={{paddingHorizontal: 10}}
            ItemSeparatorComponent={() => (
              <View
                style={{height: 1, backgroundColor: '#ccc', marginVertical: 10}}
              />
            )}
            data={dataCart}
            renderItem={({item, index}) => <CartCard item={item} />}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>You don't have any item in cart</Text>
          </View>
        )}

        <Gap height={80} />
      </ScrollView>

      <View style={styles.bottomSect}>
        <View>
          <Text>Total Harga</Text>
          <Text style={styles.textTotalHarga}>
            Rp. {getAllItemPrice() || 0}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('confirm', dataCart)}
          style={styles.buttonConfirm}>
          <Text>Beli ({getNumItem() || 0}) </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
  content: {flex: 1, marginTop: 10},

  bottomSect: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    width,
    elevation: 2,
    borderTopWidth: 1,
    borderTopColor: Colors.gray6,
  },
  buttonConfirm: {
    backgroundColor: Colors.success2,
    paddingHorizontal: 25,
    paddingVertical: 7,
    borderRadius: 7,
  },
  textTotalHarga: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default cart;
