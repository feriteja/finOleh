import React from 'react';
import {NavigationContainer  } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './authRoute';
import Main from './mainRoute';
import Splash from '../../screens/splash/splashScreen';
import {ConfirmPurchase, ItemDetail, Favorite} from '../../screens/main';
import { item } from 'constants/types/dataTypes';

export type rootParamList {
  splash:undefined;
  main:undefined;
  confirm:undefined;
  itemDetail: {item:item} ;
  favorite:undefined;
  auth:undefined;

}

const Stack = createStackNavigator<rootParamList>();

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="confirm" component={ConfirmPurchase} />
        <Stack.Screen name="itemDetail" component={ItemDetail} />
        <Stack.Screen name="favorite" component={Favorite} />
        <Stack.Screen name="auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
