import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const splashScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const authState = () => {
    if (auth().currentUser) {
      dispatch({
        type: 'LOGINAUTH',
        payload: {
          ...auth().currentUser?.providerData[0],
          uid: auth().currentUser?.uid,
        },
      });
      navigation.reset({index: 0, routes: [{name: 'main'}]});
    } else {
      setTimeout(() => {
        navigation.reset({index: 0, routes: [{name: 'main'}]});
      }, 1500);
    }
  };

  useEffect(() => {
    authState();
  }, []);

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default splashScreen;

const styles = StyleSheet.create({});
