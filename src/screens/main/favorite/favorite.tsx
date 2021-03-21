import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getFavorite} from '../../../config/redux/actions/favoriteHandler';
import {HeaderFavorite} from '../../../components/';

const favorite: React.FC = ({navigation}: any) => {
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       dispatch(getFavorite());
  //     });

  //     return unsubscribe;
  //   }, [navigation]);

  return (
    <View>
      <HeaderFavorite />
      <Text></Text>
    </View>
  );
};

export default favorite;

const styles = StyleSheet.create({});
