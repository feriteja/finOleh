import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './authRoute';
import Main from './mainRoute';
import Splash from '../../screens/splash/splashScreen';
import {ConfirmPurchase, ItemDetail, Favorite} from '../../screens/main';

const Stack = createStackNavigator();

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
