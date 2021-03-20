import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ProfileInfo, HeaderProfile} from '../../../components';
import AuthFirebase from '@react-native-firebase/auth';
import {signOut} from '../../../config/redux/actions/auth';

import NotLogin from './notLogin';

const profile: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const {auth} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      {auth ? (
        <>
          <HeaderProfile />
          <ProfileInfo />
          <Button
            onPress={() => {
              AuthFirebase().signOut();
              dispatch(signOut);
            }}
            title="logout"
          />
        </>
      ) : (
        <NotLogin />
      )}
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
});

export default profile;
