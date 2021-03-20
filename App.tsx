import React, {useEffect, useState} from 'react';
import {View, Text, LogBox} from 'react-native';
import Router from './src/config/router/index';
import {Provider} from 'react-redux';
import Store from './src/config/redux/store';
import firestore from '@react-native-firebase/firestore';

const App: React.FC = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <Provider store={Store}>
      <View style={{flex: 1}}>
        <Router />
      </View>
    </Provider>
  );
};

export default App;
