import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getFavorite} from '../../../config/redux/actions/favoriteHandler';
import {HeaderFavorite, FavoriteCard, Gap} from '../../../components/';

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

const favorite: React.FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const favorites: item[] = useSelector((state) => state.favorite);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getFavorite());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <HeaderFavorite />
      <FlatList
        data={favorites}
        keyExtractor={(data) => data.uid}
        contentContainerStyle={{marginHorizontal: 15, paddingTop: 10}}
        ItemSeparatorComponent={() => <Gap height={10} />}
        renderItem={({item}) => <FavoriteCard item={item} />}
      />
    </View>
  );
};

export default favorite;

const styles = StyleSheet.create({});
