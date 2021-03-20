import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../../assets/theme/light';
import {useNavigation} from '@react-navigation/native';

const notLogin = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>You are not logged in</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('auth')}
        style={{
          backgroundColor: Colors.secondary1,
          paddingHorizontal: 15,
          paddingVertical: 7,
        }}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default notLogin;
