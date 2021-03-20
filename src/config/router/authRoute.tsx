import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Forgot, SignIn, SignUp} from '../../screens/auth';

const Stack = createStackNavigator();

const authRoute: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="signIn" component={SignIn} />
      <Stack.Screen name="signUp" component={SignUp} />
      <Stack.Screen name="forgot" component={Forgot} />
    </Stack.Navigator>
  );
};

export default authRoute;
