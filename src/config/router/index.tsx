import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './authRoute';
import Main from './mainRoute';
import Splash from '../../screens/splash/splashScreen';
import {ConfirmPurchase, ItemDetail} from '../../screens/main';
import {useDispatch, useSelector} from 'react-redux';

const Stack = createStackNavigator();

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="confirm" component={ConfirmPurchase} />
        <Stack.Screen name="itemDetail" component={ItemDetail} />
        <Stack.Screen name="auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
