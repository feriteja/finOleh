import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Button,
} from 'react-native';
import Recomenndation from './recomendation';
import {Banner, HeaderHome} from '../../../components';
import {bannerData} from '../../../assets/data/';
import {useDispatch, useSelector} from 'react-redux';
import {
  getItemList,
  clearItemList,
} from '../../../config/redux/actions/itemHandler';
import {getCart, cleanCart} from '../../../config/redux/actions/cartHandler';

const home: React.FC = () => {
  const dispatch = useDispatch();
  const foodData = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getItemList());
    dispatch(getCart());

    return () => {
      dispatch(clearItemList);
      dispatch(cleanCart);
    };
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <HeaderHome data={foodData} />
      <Banner data={bannerData} />
      <View style={styles.content}>
        <Recomenndation data={foodData} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
  content: {
    paddingTop: 10,
  },
});

export default home;
